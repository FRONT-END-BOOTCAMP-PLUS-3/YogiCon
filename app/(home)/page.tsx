'use client';

import ConListItem from '@/components/ConListItem';
import { Categories, CategoryListItem } from '@/types/categories';
import { FormEvent, useState } from 'react';
import styled from 'styled-components';
import CategoryFilter from './components/CategoryFilter';
import SearchForm from './components/SearchForm';

/* ---------------------------------- style --------------------------------- */
const HomeLayout = styled.div``;

const FilterSection = styled.section`
  position: sticky;
  top: 1.5rem;
  z-index: 9998;
  background-color: var(--white);
  border-bottom: 0.0625rem solid #e7e7e7;
`;

const ConListSection = styled.section`
  padding-top: 1.9375rem;
  padding-bottom: 5.375rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1.9375rem;
`;

/* -------------------------------- page ------------------------------- */
const Home = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryListItem>('전체');

  const handleCategoryButtonClick = (value: CategoryListItem) => () => {
    setSelectedCategory(value);
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
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
      <ConListSection>
        {dummyConList.map(
          (item, index) =>
            (selectedCategory === '전체' ||
              selectedCategory === item.category) && (
              <ConListItem
                key={index}
                category={item.category as Categories}
                brand={item.brand}
                name={item.name}
                duedate={item.duedate}
                isDeleted={item.isDeleted}
              />
            )
        )}
      </ConListSection>
    </HomeLayout>
  );
};

export default Home;

/* ------------------------------- dummy data ------------------------------- */
const dummyConList = [
  {
    category: '패스트푸드',
    brand: 'BHC',
    name: '뿌링클',
    duedate: '2025/01/28',
    isDeleted: false,
  },
  {
    category: '패스트푸드',
    brand: 'BHC',
    name: '뿌링클',
    duedate: '2025/01/31',
    isDeleted: false,
  },
  {
    category: '패스트푸드',
    brand: 'BHC',
    name: '뿌링클',
    duedate: '2025/02/03',
    isDeleted: false,
  },
  {
    category: '패스트푸드',
    brand: 'BHC',
    name: '뿌링클',
    duedate: '2025/02/11',
    isDeleted: false,
  },
  {
    category: '패스트푸드',
    brand: 'BHC',
    name: '뿌링클',
    duedate: '2025/02/13',
    isDeleted: false,
  },
  {
    category: '패스트푸드',
    brand: 'BHC',
    name: '뿌링클',
    duedate: '2025/02/20',
    isDeleted: false,
  },
  {
    category: '패스트푸드',
    brand: 'BHC',
    name: '뿌링클',
    duedate: '2025/02/25',
    isDeleted: false,
  },
  {
    category: '패스트푸드',
    brand: 'BHC',
    name: '뿌링클',
    duedate: '2025/02/25',
    isDeleted: false,
  },
];
