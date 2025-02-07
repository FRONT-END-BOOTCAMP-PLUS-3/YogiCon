'use client';

import { giftList } from '@/app/giftData';
import GiftListItem from '@/components/GiftListItem';
import styled from 'styled-components';

/* ---------------------------------- style --------------------------------- */
const BSContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BSContentList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
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
      <BSContentList>
        {giftList.map((gift, index) => (
          <GiftListItem
            key={index}
            {...gift}
            onClick={() => handleItemClick(`${gift.brand}`)}
          />
        ))}
      </BSContentList>

      <div style={{ padding: '1.25rem 0', textAlign: 'center' }}>
        <p>더 이상 기프티콘이 없어요!</p>
      </div>
    </BSContentContainer>
  );
}
