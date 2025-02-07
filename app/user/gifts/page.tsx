'use client';

import { GiftInfo } from '@/app/giftData';
import GiftListItem from '@/components/GiftListItem';
import { CategoryListItem } from '@/types/Categories';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import styled from 'styled-components';
import CategoryFilter from './components/CategoryFilter';
import SearchForm from './components/SearchForm';

/* ---------------------------------- style --------------------------------- */
const HomeContainer = styled.div`
  height: calc(100vh - 2rem);
  display: flex;
  flex-direction: column;
`;

const FilterSection = styled.section`
  position: sticky;
  top: 1.95rem;
  z-index: 9998;
  background-color: var(--white);
  border-bottom: 0.5px solid var(--disabled);
`;

const GiftListSection = styled.section<{ $isEmpty: boolean }>`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${({ $isEmpty }) => ($isEmpty ? 'center' : 'flex-start')};
  padding: 0 5% 5.25rem 5%;
`;

const GiftList = styled.ul`
  width: 100%;
`;

const NoGiftImg = styled(Image)`
  width: 52%;
  height: auto;
  aspect-ratio: 205/268;
  margin-bottom: 1.5rem;
`;
const NoGiftText = styled.p`
  white-space: pre-line;
  color: var(--disabled);
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 2.75rem; /* 183.333% */
  letter-spacing: -0.02rem;
`;

const RegisterButton = styled.button`
  position: fixed;
  font-size: 1.125rem;
  padding: 0.625rem 1rem;
  border-radius: 1.25rem;
  background-color: var(--main);
  color: var(--white);
  z-index: 9998;
  bottom: 6.875rem;
  right: 1.5625rem;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1.375rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

/* -------------------------------- page ------------------------------- */
const Home = () => {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryListItem>('전체');
  const [searchWord, setSearchWord] = useState('');
  const [searchInputValue, setSearchInputValue] = useState('');

  const [giftList, setGiftList] = useState<GiftInfo[]>([]);
  const isEmpty = giftList.length === 0;

  useEffect(() => {
    const fetchGiftList = async () => {
      try {
        const res = await fetch(
          `/api/user/gifts?selectedCategory=${selectedCategory}&searchWord=${searchWord}`
        );

        if (!res.ok) {
          throw new Error('Gifticon not found');
        }

        const data = await res.json();
        setGiftList(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error('An unexpected error occurred');
        }
      }
    };

    fetchGiftList();
  }, [searchWord, selectedCategory]);

  const handleCategoryButtonClick = (value: CategoryListItem) => () => {
    setSelectedCategory(value);
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setSearchWord(searchInputValue);
  };
  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  const handleGiftListItemClick = (id: string) => () => {
    router.push(`/user/gifts/${id}`);
  };

  const handleRegisterClick = () => {
    router.push('/user/gifts/create');
  };

  return (
    <HomeContainer>
      <FilterSection aria-label="검색 및 필터링">
        <SearchForm
          onSubmit={handleSearch}
          onInputChange={handleSearchInputChange}
        />
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelect={handleCategoryButtonClick}
        />
      </FilterSection>

      <GiftListSection aria-label="기프티콘 목록" $isEmpty={isEmpty}>
        {!isEmpty ? (
          <GiftList>
            {giftList.map((item) => (
              <GiftListItem
                key={item.id}
                onClick={handleGiftListItemClick(item.id)}
                {...item}
              />
            ))}
          </GiftList>
        ) : (
          <>
            <NoGiftImg
              src="/no_gift_image.webp"
              priority={true}
              width={205}
              height={268}
              alt="선물상자 캐릭터"
            />
            <NoGiftText>
              {'등록된 기프티콘이 없어요! \n ⊕ 버튼을 눌러 등록해보세요'}
            </NoGiftText>
          </>
        )}
      </GiftListSection>

      <RegisterButton type="button" onClick={handleRegisterClick}>
        <LuPlus
          size={'1.5rem'}
          style={{
            marginRight: '0.25rem',
          }}
        />
        등록하기
      </RegisterButton>
    </HomeContainer>
  );
};

export default Home;
