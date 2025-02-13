'use client';

import { Categories } from '@/types/Categories';
import Image from 'next/image';
import { forwardRef } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { TbRestore, TbTrash } from 'react-icons/tb';
import styled from 'styled-components';
import GiftListBadge from './GiftListBadge';
import useValidImageUrl from '@/hooks/useValidImageUrl';

/* ---------------------------------- style --------------------------------- */
const GiftContainer = styled.li`
  /* cursor: pointer; */
  width: 100%;
  height: fit-content;
  padding: 1.25rem 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  gap: 0.9rem;
  border-bottom: 1px solid var(--disabled);
  background-color: transparent;
  transition: 0.3s ease all;
`;

// 왼쪽
const GiftLeftWrapper = styled.div`
  width: 20%;
  aspect-ratio: 1/1;
  border-radius: 15px;
  border: 1px solid var(--disabled);
  background-color: var(--white);
  position: relative;
  transition: 0.3s ease all;
`;

const GiftLeftImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const GiftLeftBadge = styled.div`
  position: absolute;
  right: -0.9375rem;
  top: -0.9375rem;
`;

const GiftLeftExpiredText = styled.span`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 0.7rem;
  color: var(--white);
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 15px;
`;

// 중앙
const GiftCenterWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
`;

const GiftCategoryText = styled.span`
  font-size: 0.7rem;
  padding: 3px 1.5rem;
  border: 1px solid var(--sub);
  border-radius: 40px;
  background-color: var(--white);
`;

const GiftTitleText = styled.h3`
  width: 100%;
  font-size: 1rem;
  margin-bottom: 0.3125rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const GiftDueDate = styled.span`
  font-size: 0.7rem;
`;

// 오른쪽
const GiftRightWrapper = styled.div`
  width: 20%;
  width: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const GiftRightTrashWrapper = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
`;

const GiftRightTrashButton = styled.button<{ $restore: boolean }>`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 5px;
  font-size: 0.9rem;
  font-weight: bold;
  color: ${(props) => (props.$restore ? 'var(--safety)' : 'var(--warning)')};
  border: 1px solid;
  border-radius: 10px;
  border-color: ${(props) =>
    props.$restore ? 'var(--safety)' : 'var(--warning)'};
  background-color: var(--white);
  transition: 0.3s ease all;
  @media (max-width: 371px) {
    font-size: 0.7rem;
  }
  &:active {
    background-color: ${(props) =>
      props.$restore ? 'var(--safety)' : 'var(--warning)'};
    color: var(--white);
  }
`;

/* ---------------------------------- type ---------------------------------- */
type GiftListItemProps = {
  imageUrl: string;
  category: Categories;
  brand: string;
  productName: string;
  dueDate: string;
  isDeleted: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  handleTrashClick?: () => void;
  handleRestoreClick?: () => void;
};

/* -------------------------------- component ------------------------------- */
const GiftListItem = forwardRef<HTMLLIElement, GiftListItemProps>(
  (
    {
      imageUrl,
      category,
      brand,
      productName,
      dueDate,
      isDeleted,
      isDisabled,
      onClick,
      handleTrashClick,
      handleRestoreClick,
    },
    ref
  ) => {
    const isExpired = !isDeleted && isDisabled;
    const validImageUrl: string = useValidImageUrl(imageUrl);
    return (
      <GiftContainer ref={ref} onClick={onClick}>
        <GiftLeftWrapper>
          <GiftLeftImage
            src={validImageUrl}
            alt="gifticon"
            width={100}
            height={100}
          />
          {isDisabled && (
            <GiftLeftBadge>
              <GiftListBadge dueDate={dueDate} isLarge={false} />
            </GiftLeftBadge>
          )}
          {isExpired && <GiftLeftExpiredText>기한만료</GiftLeftExpiredText>}
        </GiftLeftWrapper>
        <GiftCenterWrapper>
          <GiftCategoryText>{category}</GiftCategoryText>
          <GiftTitleText>
            [{brand}] {productName}
          </GiftTitleText>
          <GiftDueDate>유효기간: ~{dueDate.toString()}</GiftDueDate>
        </GiftCenterWrapper>
        {isDisabled ? (
          <GiftRightTrashWrapper>
            <GiftRightTrashButton
              type="button"
              $restore={false}
              onClick={(e) => {
                e.stopPropagation();
                handleTrashClick?.();
              }}
            >
              <TbTrash />
              &nbsp;영구삭제
            </GiftRightTrashButton>
            <GiftRightTrashButton
              type="button"
              $restore={true}
              onClick={(e) => {
                e.stopPropagation();
                handleRestoreClick?.();
              }}
            >
              <TbRestore />
              &nbsp;복원
            </GiftRightTrashButton>
          </GiftRightTrashWrapper>
        ) : (
          <GiftRightWrapper>
            <GiftListBadge dueDate={dueDate} isLarge={true} />
            <IoIosArrowForward size={30} style={{ color: 'var(--disabled)' }} />
          </GiftRightWrapper>
        )}
      </GiftContainer>
    );
  }
);
GiftListItem.displayName = 'GiftListItem'; // forwardRef 사용 시 필수
export default GiftListItem;
