'use client';

import Image from 'next/image';
import { IoIosArrowForward } from 'react-icons/io';
import { TbRestore, TbTrash } from 'react-icons/tb';
import styled from 'styled-components';
import ConListBadge from './ConListBadge';
import { Categories } from '@/types/categories';

/* ---------------------------------- style --------------------------------- */
const ConContainer = styled.li`
  cursor: pointer;
  width: 100%;
  height: fit-content;
  padding: 1.25rem 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  gap: 0.9rem;
  border-bottom: 1px solid var(--disabled);
  background-color: var(--white);
  transition: 0.3s ease all;
`;

// 왼쪽
const ConLeftWrapper = styled.div`
  width: 20%;
  aspect-ratio: 1/1;
  border-radius: 15px;
  border: 1px solid var(--disabled);
  background-color: var(--white);
  position: relative;
  transition: 0.3s ease all;
`;

const ConLeftImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ConLeftBadge = styled.div`
  position: absolute;
  right: -0.9375rem;
  top: -0.9375rem;
`;

const ConLeftExpiredText = styled.span`
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
const ConCenterWrapper = styled.div<{ $isTrash: boolean }>`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
`;

const ConCategoryText = styled.span`
  font-size: 0.7rem;
  padding: 3px 1.5rem;
  border: 1px solid var(--sub);
  border-radius: 40px;
  background-color: var(--white);
`;

const ConTitleText = styled.h3`
  width: 100%;
  font-size: 1rem;
  margin-bottom: 0.3125rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ConDueDate = styled.span`
  font-size: 0.7rem;
`;

// 오른쪽
const ConRightWrapper = styled.div`
  width: 20%;
  width: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const ConRightTrashWrapper = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
`;

const ConRightTrashButton = styled.button<{ $restore: boolean }>`
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
type ConListProps = {
  image_url: string;
  category: Categories;
  brand: string;
  name: string;
  duedate: string;
  isDeleted: boolean;
  onClick?: () => void;
};

/* -------------------------------- component ------------------------------- */
export default function ConListItem({
  image_url,
  category,
  brand,
  name,
  duedate,
  isDeleted,
  onClick,
}: ConListProps) {
  const dateObject: Date = new Date(duedate);
  const dueDateString: string = dateObject.toISOString().split('T')[0];
  const dateTodayObject: Date = new Date();

  const dueDateOnly: Date = new Date(
    dateObject.getFullYear(),
    dateObject.getMonth(),
    dateObject.getDate()
  );
  const todayDateOnly: Date = new Date(
    dateTodayObject.getFullYear(),
    dateTodayObject.getMonth(),
    dateTodayObject.getDate()
  );

  const isExpired: boolean = dueDateOnly.getTime() < todayDateOnly.getTime();

  const isTrash: boolean = isDeleted || isExpired;

  return (
    <ConContainer onClick={onClick}>
      <ConLeftWrapper>
        <ConLeftImage src={image_url} alt="gifticon" width={100} height={100} />
        {isDeleted && !isExpired && (
          <ConLeftBadge>
            <ConListBadge duedate={duedate} isLarge={false} />
          </ConLeftBadge>
        )}
        {isExpired && <ConLeftExpiredText>기한만료</ConLeftExpiredText>}
      </ConLeftWrapper>

      <ConCenterWrapper $isTrash={isTrash}>
        <ConCategoryText>{category}</ConCategoryText>
        <ConTitleText>
          [{brand}] {name}
        </ConTitleText>
        <ConDueDate>유효기간: ~{dueDateString}</ConDueDate>
      </ConCenterWrapper>

      {isTrash ? (
        <ConRightTrashWrapper>
          <ConRightTrashButton type="button" $restore={false}>
            <TbTrash />
            &nbsp;영구삭제
          </ConRightTrashButton>
          <ConRightTrashButton type="button" $restore={true}>
            <TbRestore />
            &nbsp;복원
          </ConRightTrashButton>
        </ConRightTrashWrapper>
      ) : (
        <ConRightWrapper>
          <ConListBadge duedate={duedate} isLarge={true} />
          <IoIosArrowForward size={30} style={{ color: 'var(--disabled)' }} />
        </ConRightWrapper>
      )}
    </ConContainer>
  );
}
