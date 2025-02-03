'use client';

import { CategoryListItem } from '@/types/categories';
import { BiCategoryAlt, BiStoreAlt } from 'react-icons/bi';
import { BsStars } from 'react-icons/bs';
import { CiCoffeeCup } from 'react-icons/ci';
import { HiOutlineDotsCircleHorizontal } from 'react-icons/hi';
import { IoFastFoodOutline, IoIceCreamOutline } from 'react-icons/io5';
import { MdCardGiftcard } from 'react-icons/md';
import { RiCake3Line } from 'react-icons/ri';
import styled from 'styled-components';

/* ---------------------------------- style --------------------------------- */
const IconButton = styled.button<{ $isSelected: boolean }>`
  background-color: ${({ $isSelected }) =>
    $isSelected ? 'rgba(255, 192, 192, 0.40)' : 'transparent'};
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: center;
  border-radius: 0.625rem;
  padding: 0.3125rem 0.625rem 0 0.625rem;
  font-size: 0.6875rem;
  line-height: 0.6875rem;
  letter-spacing: -0.02rem;
  color: var(--black);
  cursor: pointer;
`;

const IconBox = styled.div`
  background-color: var(--white);
  width: 3.125rem;
  height: 3.125rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.375rem;
  border: 1px solid var(--disabled);
  border-radius: 50%;
  font-size: 2rem;
`;

const HighlightBox = styled.div`
  width: 100%;
  height: 0.125rem;
  background-color: var(--main);
  margin-top: 0.6875rem;
`;

/* ---------------------------------- type ---------------------------------- */
type CategoryButton = {
  category: CategoryListItem;
  isSelected: boolean;
  onClick: (value: CategoryListItem) => () => void;
};

/* -------------------------------- component ------------------------------- */
const iconOfCategory = {
  전체: <BiCategoryAlt />,
  카페: <CiCoffeeCup />,
  편의점: <BiStoreAlt />,
  상품권: <MdCardGiftcard />,
  아이스크림: <IoIceCreamOutline />,
  패스트푸드: <IoFastFoodOutline />,
  베이커리: <RiCake3Line />,
  뷰티: <BsStars />,
  기타: <HiOutlineDotsCircleHorizontal />,
};

const CategoryButton = ({ category, isSelected, onClick }: CategoryButton) => {
  return (
    <IconButton
      type="button"
      $isSelected={isSelected}
      onClick={onClick(category)}
      aria-selected={isSelected}
    >
      <IconBox>{iconOfCategory[category]}</IconBox>
      {category}
      {isSelected && <HighlightBox />}
    </IconButton>
  );
};

export default CategoryButton;
