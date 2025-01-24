'use client';

import { CATEGORY_LIST } from '@/constants';
import { CategoryListItem } from '@/types/categories';
import styled from 'styled-components';
import CategoryButton from './CategoryButton';

/* ---------------------------------- style --------------------------------- */
const CategoryButtonContainer = styled.div`
  width: 100%;
  overflow-x: scroll;
`;

const CategoryButtonList = styled.ul`
  display: flex;
  padding: 0 1.1875rem;
  gap: 0.8125rem;
  width: 100%;
`;
const CategoryItem = styled.li``;

/* ---------------------------------- type ---------------------------------- */
type CategoryFilterProps = {
  selectedCategory: CategoryListItem;
  onSelect: (value: CategoryListItem) => () => void;
};

/* -------------------------------- component ------------------------------- */
const CategoryFilter = ({
  selectedCategory,
  onSelect,
}: CategoryFilterProps) => {
  return (
    <CategoryButtonContainer>
      <CategoryButtonList>
        {CATEGORY_LIST.map((category) => (
          <CategoryItem key={category}>
            <CategoryButton
              key={category}
              category={category}
              isSelected={category === selectedCategory}
              onClick={onSelect}
            />
          </CategoryItem>
        ))}
      </CategoryButtonList>
    </CategoryButtonContainer>
  );
};

export default CategoryFilter;
