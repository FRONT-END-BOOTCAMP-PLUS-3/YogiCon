'use client';

import ConListItem from '@/components/ConListItem';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ConInfo } from '../giftData';

const TrashContainer = styled.main<{ $isEmpty: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${({ $isEmpty }) => ($isEmpty ? 'center' : 'flex-start')};
  height: calc(100vh - 3.375rem);
`;

const ConList = styled.ul`
  width: 100%;
  padding: 0 5% 5.25rem 5%;
`;

const NoConImg = styled(Image)`
  width: 52%;
  height: auto;
  aspect-ratio: 205/268;
  margin-bottom: 1.5rem;
`;
const NoConText = styled.p`
  white-space: pre-line;
  color: var(--disabled);
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 2.75rem;
  letter-spacing: -0.02rem;
`;

const Trash = () => {
  const [trashList, setTrashList] = useState<ConInfo[]>([]);
  const isEmpty = trashList.length === 0;

  useEffect(() => {
    const fetchTrashList = async () => {
      try {
        const res = await fetch(`/api/trash`);

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
        <ConList>
          {trashList.map((item) => (
            <ConListItem key={item.id} {...item} />
          ))}
        </ConList>
      ) : (
        <>
          <NoConImg
            src="/no_gift_image.webp"
            priority={true}
            width={205}
            height={268}
            alt="선물상자 캐릭터"
          />
          <NoConText>{'삭제된 기프티콘이 없어요!'}</NoConText>
        </>
      )}
    </TrashContainer>
  );
};

export default Trash;
