'use client';

import { CATEGORY_LIST } from '@/constants';
import { CategoryListItem } from '@/types/categories';
import styled from 'styled-components';
import CategoryButton from './CategoryButton';

const CategoryButtonList = styled.ul``;
const CategoryItem = styled.li``;

type CategoryFilterProps = {
  onSelect: (value: CategoryListItem) => () => void;
};

const CategoryFilter = ({ onSelect }: CategoryFilterProps) => {
  return (
    <CategoryButtonList>
      {CATEGORY_LIST.map((category) => (
        <CategoryItem key={category}>
          <CategoryButton
            key={category}
            category={category}
            onClick={onSelect}
          />
        </CategoryItem>
      ))}
    </CategoryButtonList>
  );
};

export default CategoryFilter;
