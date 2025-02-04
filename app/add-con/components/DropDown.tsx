'use client';

import styled from 'styled-components';
import { CategoryListItem } from '@/types/categories';
import { CATEGORY_LIST } from '@/constants';

/* ---------------------------------- style --------------------------------- */
const DropDownBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1.25rem;
`;

const DropDownLabel = styled.label`
  font-size: 1.125rem;
  color: var(--deepgray);
`;

const DropDownSelectBox = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  height: 2.875rem;
  margin-bottom: 2.875rem;
  box-shadow: 0 0.25rem 0.875rem 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  &:focus {
    border-bottom: 1px solid var(--main);
  }
`;

const DropDownOption = styled.option``;

/* ---------------------------------- type ---------------------------------- */
type DropDownProps = {
  selectedCategory: CategoryListItem | '';
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

/* -------------------------------- component ------------------------------- */
const DropDown = ({ selectedCategory, onChange }: DropDownProps) => {
  return (
    <DropDownBox>
      <DropDownLabel htmlFor="category">카테고리</DropDownLabel>
      <DropDownSelectBox
        id="category"
        value={selectedCategory}
        onChange={onChange}
      >
        <DropDownOption value="">카테고리를 선택하세요</DropDownOption>
        {CATEGORY_LIST.filter((category) => category !== '전체').map(
          (category) => (
            <DropDownOption key={category} value={category}>
              {category}
            </DropDownOption>
          )
        )}
      </DropDownSelectBox>
    </DropDownBox>
  );
};

export default DropDown;
