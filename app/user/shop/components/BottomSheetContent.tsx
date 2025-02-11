'use client';

import { GiftDto } from '@/application/usecases/gift/dto/GiftDto';
import GiftListItem from '@/components/GiftListItem';
import { useShopStore } from '@/stores/useShopStore';
import { SelectedItem } from '@/types/SelectedItem';
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
  setSelectedItemKey: (selectedItem: SelectedItem) => void;
  moveSheetToBottom: () => void;
  giftList: GiftDto[] | null;
  loading: boolean;
  lastElementRef?: (node: HTMLLIElement | null) => void;
};

/* ---------------------------------- component --------------------------------- */
export default function BottomSheetContent({
  setSelectedItemKey,
  moveSheetToBottom,
  giftList,
  loading,
  lastElementRef,
}: BottomSheetContentProps) {
  const { setItemClicked } = useShopStore();
  const handleItemClick = (giftId: string, key: string) => {
    setSelectedItemKey({ giftId, key });
    setItemClicked(true);
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
              ref={index === giftList.length - 1 ? lastElementRef : null}
              onClick={() => handleItemClick(`${gift.id}`, `${gift.brand}`)}
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
