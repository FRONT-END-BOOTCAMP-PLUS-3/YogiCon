'use client';

import ConListItem from '@/components/ConListItem';
import { CategoryListItem } from '@/types/categories';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import styled from 'styled-components';
import { giftList } from '../giftData';
import CategoryFilter from './components/CategoryFilter';
import SearchForm from './components/SearchForm';

/* ---------------------------------- style --------------------------------- */
const HomeLayout = styled.div``;

const FilterSection = styled.section`
  position: sticky;
  top: 1.5rem;
  z-index: 9998;
  background-color: var(--white);
  border-bottom: 0.1px solid #e7e7e7;
`;

const ConListSection = styled.section`
  padding: 0 0.9375rem 5.375rem 1.5rem;
`;

const ConList = styled.ul``;

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
`;

/* -------------------------------- page ------------------------------- */
const Home = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryListItem>('전체');

  const handleCategoryButtonClick = (value: CategoryListItem) => () => {
    setSelectedCategory(value);
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
  };

  const handleRegisterClick = () => {
    router.push('/add-con');
  };

  return (
    <HomeLayout>
      <FilterSection aria-label="검색 및 필터링">
        <SearchForm onSubmit={handleSearch} />
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelect={handleCategoryButtonClick}
        />
      </FilterSection>

      <ConListSection aria-label="기프티콘 목록">
        <ConList>
          {/* 더미 데이터 */}
          {giftList.map(
            (item, index) =>
              (selectedCategory === '전체' ||
                selectedCategory === item.category) && (
                <ConListItem key={index} {...item} />
              )
          )}
        </ConList>
      </ConListSection>

      <RegisterButton type="button" onClick={handleRegisterClick}>
        <LuPlus
          size={'1.5rem'}
          style={{
            marginRight: '0.25rem',
          }}
        />
        등록하기
      </RegisterButton>
    </HomeLayout>
  );
};

export default Home;
