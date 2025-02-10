'use client';

import { GiftDto } from '@/application/usecases/gift/dto/GiftDto';
import GiftListItem from '@/components/GiftListItem';
import EventBus from '@/types/EventBus';
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
  setSelectedItemKey: (key: string) => void;
  moveSheetToBottom: () => void;
  giftList: GiftDto[] | null;
  loading: boolean;
};

/* ---------------------------------- component --------------------------------- */
export default function BottomSheetContent({
  setSelectedItemKey,
  moveSheetToBottom,
  giftList,
  loading,
}: BottomSheetContentProps) {
  const handleItemClick = (key: string) => {
    setSelectedItemKey(key);
    EventBus.emit('itemClicked', true);
    moveSheetToBottom();
  };

  return (
    <BSContentContainer>
      {giftList && (
        <BSContentList>
          {giftList.map((gift: GiftDto, index) => (
            <GiftListItem
              key={index}
              {...gift}
              onClick={() => handleItemClick(`${gift.brand}`)}
            />
          ))}
        </BSContentList>
      )}

      <div style={{ padding: '1.25rem 0', textAlign: 'center' }}>
        {loading ? (
          <p>기프티콘을 불러오는 중입니다 ...</p>
        ) : (
          <p>더 이상 기프티콘이 없어요!</p>
        )}
      </div>
    </BSContentContainer>
  );
}
