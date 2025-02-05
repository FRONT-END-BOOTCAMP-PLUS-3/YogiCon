'use client';

import styled from 'styled-components';
import { CategoryListItem } from '@/types/categories';
import { CATEGORY_LIST } from '@/constants';
import { useId } from 'react';

/* ---------------------------------- style --------------------------------- */
const CategoryBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1.25rem;
`;

const CategoryLabel = styled.label`
  font-size: 1.125rem;
  color: var(--deepgray);
`;

const CategorySelect = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  height: 2.875rem;
  margin-bottom: 2.875rem;
  box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  border: 1px solid var(--disabled);
  cursor: pointer;
  &:focus {
    border-color: var(--main);
  }
`;

const CategoryOption = styled.option``;

/* ---------------------------------- type ---------------------------------- */
type CategoryDropDownProps = {
  selectedCategory: CategoryListItem | '';
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

/* -------------------------------- component ------------------------------- */
const CategoryDropDown = ({
  selectedCategory,
  onChange,
}: CategoryDropDownProps) => {
  const id = useId();

  return (
    <CategoryBox>
      <CategoryLabel htmlFor={id}>카테고리</CategoryLabel>
      <CategorySelect id={id} value={selectedCategory} onChange={onChange}>
        <CategoryOption value="">카테고리를 선택하세요</CategoryOption>
        {CATEGORY_LIST.filter((category) => category !== '전체').map(
          (category) => (
            <CategoryOption key={category} value={category}>
              {category}
            </CategoryOption>
          )
        )}
      </CategorySelect>
    </CategoryBox>
  );
};

export default CategoryDropDown;
