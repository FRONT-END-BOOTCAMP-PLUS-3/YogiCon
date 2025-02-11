'use client';

import { GiftDto } from '@/application/usecases/gift/dto/GiftDto';
import GiftListItem from '@/components/GiftListItem';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
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
  const [trashList, setTrashList] = useState<GiftDto[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [page, setPage] = useState(1);
  const isEmpty = trashList.length === 0;

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (!hasNextPage || !node) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log('마지막 요소 감지됨');
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasNextPage]
  );

  useEffect(() => {
    const fetchTrashList = async () => {
      try {
        const res = await fetch(`/api/user/gifts/disabled?page=${page}`);

        if (!res.ok) {
          alert('휴지통 기프티콘 리스트를 불러오는데 실패했습니다.');
          return;
        }

        const disabledGiftListDto = await res.json();

        if (page === 1) {
          setTrashList(disabledGiftListDto.data.giftList);
          setHasNextPage(true);
        } else {
          setTrashList((prev) => [
            ...prev,
            ...disabledGiftListDto.data.giftList,
          ]);
        }
        setHasNextPage(disabledGiftListDto.data.hasNextPage);
      } catch (error) {
        console.error('휴지통 기프티콘 리스트 조회 오류: ', error);
      }
    };

    if (hasNextPage) fetchTrashList();
  }, [page, hasNextPage]);

  const handleDeleteGift = async (id: string) => {
    try {
      const res = await fetch(`/api/user/gifts/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        throw new Error('Response Error');
      }
      alert('해당 기프티콘이 삭제되었습니다.');
      setTrashList((prev) => prev.filter((gift) => gift.id != id));
    } catch (error) {
      console.error('기프티콘 삭제에 실패했습니다.', error);
    }
  };

  const handleRestoreGift = (id: string) => {
    setTrashList((prev) =>
      prev.map((gift) =>
        gift.id === id ? { ...gift, isDeleted: false } : gift
      )
    );
  };

  return (
    <TrashContainer $isEmpty={isEmpty}>
      {!isEmpty ? (
        <GiftList>
          {trashList.map((item, index) => (
            <GiftListItem
              key={item.id}
              ref={index === trashList.length - 1 ? lastElementRef : null}
              handleTrashClick={() => handleDeleteGift(item.id)}
              handleRestoreClick={() => handleRestoreGift(item.id)}
              isDisabled={true}
              {...item}
            />
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
