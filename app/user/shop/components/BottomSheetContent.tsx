/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { GiftDto } from '@/application/usecases/gift/dto/GiftDto';
import GiftListItem from '@/components/GiftListItem';
import EventBus from '@/types/EventBus';
import { useEffect, useState } from 'react';
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
};

/* ---------------------------------- component --------------------------------- */
export default function BottomSheetContent({
  setSelectedItemKey,
  moveSheetToBottom,
}: BottomSheetContentProps) {
  const handleItemClick = (key: string) => {
    setSelectedItemKey(key);
    EventBus.emit('itemClicked', true);
    moveSheetToBottom();
  };
  const [giftList, setGiftList] = useState<GiftDto[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getGifts = async (): Promise<any> => {
      try {
        setLoading(true);
        // disabled 되지 않은 gift list 가져오는 api 사용
        const res = await fetch('/api/user/shop', { method: 'GET' });
        const result = await res.json();

        if (!result.success) {
          console.error('API 오류:', result.message);
          setGiftList([]);
          return [];
        }
        console.log('가져옴', result.data);
        setGiftList(result.data);
      } catch (error) {
        console.error('데이터 로드 실패:', error);
        return [];
      } finally {
        setLoading(false);
      }
    };

    getGifts();
  }, []);

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
