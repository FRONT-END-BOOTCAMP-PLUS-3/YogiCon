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
const IconButton = styled.button``;

const IconBox = styled.div``;

/* ---------------------------------- type ---------------------------------- */
type CategoryButton = {
  category: CategoryListItem;
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

const CategoryButton = ({ category, onClick }: CategoryButton) => {
  return (
    <IconButton>
      <IconBox onClick={onClick(category)}>{iconOfCategory[category]}</IconBox>
      {category}
    </IconButton>
  );
};

export default CategoryButton;
