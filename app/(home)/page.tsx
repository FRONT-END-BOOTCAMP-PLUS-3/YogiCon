'use client';

import { CategoryListItem } from '@/types/categories';
import { useState } from 'react';
import CategoryFilter from './components/CategoryFilter';

const Home = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryListItem>('전체');

  const handleCategoryButtonClick = (value: CategoryListItem) => () => {
    setSelectedCategory(value);
  };

  return (
    <div style={{ overflow: 'hidden' }}>
      {selectedCategory}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelect={handleCategoryButtonClick}
      />
    </div>
  );
};

export default Home;
