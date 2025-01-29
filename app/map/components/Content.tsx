'use client';

import styled from 'styled-components';
import ConListItem from '@/components/ConListItem';
import { giftList } from './giftData';

/* ---------------------------------- style --------------------------------- */
const BSContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/* ---------------------------------- type --------------------------------- */
type BottomSheetContentProps = {
  selectedItemKey: string | null;
  setSelectedItemKey: (key: string) => void;
  moveSheetToBottom: () => void;
};

/* ---------------------------------- component --------------------------------- */
export default function BottomSheetContent({
  setSelectedItemKey,
  moveSheetToBottom,
}: BottomSheetContentProps) {
  const handleItemClick = (key: string) => {
    setSelectedItemKey(key);
    moveSheetToBottom();
  };

  return (
    <BSContentContainer>
      {giftList.map((gift, index) => (
        <ConListItem
          key={index}
          category={gift.category}
          brand={gift.brand}
          name={gift.name}
          duedate={gift.duedate}
          isDeleted={gift.isDeleted}
          onClick={() => handleItemClick(`${gift.brand}`)}
        />
      ))}

      <div style={{ padding: '20px 0' }}>
        <p>더 이상 기프티콘이 없어요!</p>
      </div>
    </BSContentContainer>
  );
}
