'use client';

import { GiftDto } from '@/application/usecases/gift/dto/GiftDto';
import GiftListItem from '@/components/GiftListItem';
import { CategoryListItem } from '@/types/Categories';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { LuPlus } from 'react-icons/lu';
import styled from 'styled-components';
import CategoryFilter from './components/CategoryFilter';
import SearchForm from './components/SearchForm';
import { useUserStore } from '@/stores/userStore';

/* ---------------------------------- style --------------------------------- */
const HomeContainer = styled.div`
  height: calc(100vh - 2rem);
  display: flex;
  flex-direction: column;
`;

const FilterSection = styled.section`
  position: fixed;
  width: 100%;
  max-width: 768px;
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
  const userData = useUserStore((state) => state.userData);
  const userId = userData?.id;

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryListItem>('전체');
  const [searchWord, setSearchWord] = useState('');
  const [searchInputValue, setSearchInputValue] = useState('');
  const [hasNextPage, setHasNextPage] = useState(true);
  const [page, setPage] = useState(1);

  const [giftList, setGiftList] = useState<GiftDto[]>([]);
  const isEmpty = giftList.length === 0;

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (!hasNextPage || !node) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log('마지막 요소 감지됨');
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasNextPage]
  );

  useEffect(() => {
    const abortController = new AbortController();

    const fetchGiftList = async () => {
      try {
        const response = await fetch(
          `/api/user/gifts?selectedCategory=${selectedCategory}&searchWord=${searchWord}&page=${page}&userId=${userId}`,
          {
            signal: abortController.signal,
          }
        );

        if (!response.ok) {
          alert('기프티콘 리스트를 불러오는데 실패했습니다.');
          return;
        }

        const giftListDto = await response.json();

        console.log('조회된 기프티콘 리스트: ', giftListDto.data);

        if (page === 1) {
          setGiftList(giftListDto.data.giftList);
          setHasNextPage(true);
        } else {
          setGiftList((prev) => [...prev, ...giftListDto.data.giftList]);
        }

        setHasNextPage(giftListDto.data.hasNextPage);
      } catch (err: unknown) {
        if (!(err instanceof DOMException)) {
          console.error('기프티콘 리스트 조회 오류: ', err);
        }
      }
    };

    if (hasNextPage) fetchGiftList();

    return () => {
      abortController.abort();
    };
  }, [searchWord, selectedCategory, page, hasNextPage, userId]);

  const handleCategoryButtonClick = (value: CategoryListItem) => () => {
    setSelectedCategory(value);
    setPage(1); // 새로운 카테고리 선택 시 페이지 초기화
    setHasNextPage(true); // 새로운 카테고리 선택 시 hasNextPage 초기화
    setGiftList([]); // 기존 데이터 초기화
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setSearchWord(searchInputValue);
    setPage(1);
    setGiftList([]);
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

  console.log('page: ', page);
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
      <div style={{ paddingBottom: '10rem' }} />

      <GiftListSection aria-label="기프티콘 목록" $isEmpty={isEmpty}>
        {!isEmpty ? (
          <GiftList>
            {giftList.map((item, index) => (
              <GiftListItem
                key={item.id}
                ref={index === giftList.length - 1 ? lastElementRef : null} // 마지막 요소 감지
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
