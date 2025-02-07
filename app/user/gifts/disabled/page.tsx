'use client';

import { GiftInfo } from '@/app/giftData';
import GiftListItem from '@/components/GiftListItem';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const TrashContainer = styled.main<{ $isEmpty: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${({ $isEmpty }) => ($isEmpty ? 'center' : 'flex-start')};
  height: calc(100vh - 3.375rem);
`;

const GiftList = styled.ul`
  width: 100%;
  padding: 0 5% 5.25rem 5%;
`;

const NoGiftImg = styled(Image)`
  width: 52%;
  height: auto;
  aspect-ratio: 205/268;
  margin-bottom: 1.5rem;
`;
const NoGiftText = styled.p`
  white-space: pre-line;
  color: var(--disabled);
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 2.75rem;
  letter-spacing: -0.02rem;
`;

const Trash = () => {
  const [trashList, setTrashList] = useState<GiftInfo[]>([]);
  const isEmpty = trashList.length === 0;

  useEffect(() => {
    const fetchTrashList = async () => {
      try {
        const res = await fetch(`/api/user/gifts/disabled`);

        if (!res.ok) {
          throw new Error('Response Error');
        }

        const data = await res.json();
        setTrashList(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error('An unexpected error occurred');
        }
      }
    };

    fetchTrashList();
  }, []);

  return (
    <TrashContainer $isEmpty={isEmpty}>
      {!isEmpty ? (
        <GiftList>
          {trashList.map((item) => (
            <GiftListItem key={item.id} {...item} />
          ))}
        </GiftList>
      ) : (
        <>
          <NoGiftImg
            src="/no_gift_image.webp"
            priority={true}
            width={205}
            height={268}
            alt="선물상자 캐릭터"
          />
          <NoGiftText>{'삭제된 기프티콘이 없어요!'}</NoGiftText>
        </>
      )}
    </TrashContainer>
  );
};

export default Trash;
