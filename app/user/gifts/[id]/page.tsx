'use client';

import { srOnly } from '@/app/globalStyles';
import { GiftDto } from '@/application/usecases/gift/dto/GiftDto';
import Button from '@/components/Button';
import GiftListBadge from '@/components/GiftListBadge';
import ModalDialog from '@/components/ModalDialog';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CgArrowsExpandRight } from 'react-icons/cg';
import { FaRegTrashAlt } from 'react-icons/fa';
import { LuMail } from 'react-icons/lu';
import { TbBuildingStore } from 'react-icons/tb';
import styled from 'styled-components';

/* ---------------------------------- style --------------------------------- */
const ViewGiftContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.75rem;
  padding-bottom: 3rem;
`;

const GiftImgText = styled.figcaption`
  ${srOnly}
`;
const GiftImgWrapper = styled.figure`
  width: 70%;
  aspect-ratio: 3/4;
  position: relative;
  margin-bottom: 1.75rem;
  border: 1px solid var(--gray);
  border-radius: 0.625rem;
`;
const GiftImg = styled(Image)`
  object-fit: contain;
`;
const GiftBadge = styled.div`
  position: absolute;
  top: -1.5rem;
  right: -1.5rem;
`;
const ExpandButton = styled.button`
  position: absolute;
  bottom: 0.75rem;
  right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  padding: 0.25rem;
  border-radius: 50%;
  background-color: var(--white);
  color: var(--deepgray);
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const IconButtonWrapper = styled.div`
  display: flex;
  gap: 1.25rem;
  width: 90%;
  margin-bottom: 2rem;
  flex-shrink: 0;
`;

const IconButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  aspect-ratio: 1;
  padding: 0.75rem 1rem;
  background-color: #edf2f7;
  color: #4299e1;
  border-radius: 1rem;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

const IconButtonText = styled.span`
  flex-grow: 1;
  display: flex;
  align-items: center;
  color: #2b6cb0;
  font-weight: bold;
  line-height: 1.375rem;
  letter-spacing: -0.02rem;
  font-size: 1rem;
  word-break: keep-all;
`;

const LongButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 80%;
`;

const ExpandedGiftImg = styled.img`
  width: 100%;
  border-radius: 1rem;
`;

/* ---------------------------------- type ---------------------------------- */

/* -------------------------------- component ------------------------------- */
const ViewGift = () => {
  const { id } = useParams();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [giftInfo, setGiftInfo] = useState<GiftDto | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchGiftInfo = async () => {
      try {
        const res = await fetch(`/api/user/gifts/${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) {
          throw new Error('Response Error');
        }

        const data = await res.json();
        setGiftInfo(data.gift);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error('An unexpected error occurred');
        }
      }
    };

    fetchGiftInfo();
  }, [id]);

  if (!giftInfo) return <div>Loading...</div>;

  const { imageUrl, brand, category, dueDate, productName } = giftInfo;
  console.log('giftInfo: ', giftInfo);

  const handleShopsClick = () => {
    if (id && brand) {
      router.push(`/user/shop?giftId=${id}&key=${brand}`);
    }
  };

  const handleSoftDeleteGift = async () => {
    if (!id || !giftInfo) return;
    try {
      const updateGiftInfo = {
        ...giftInfo,
        isDeleted: true,
      };
      console.log('updateGiftInfo', updateGiftInfo);
      const response = await fetch(`/api/user/gifts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateGiftInfo),
      });

      if (!response.ok) {
        throw new Error('서버 업데이트 실패');
      } else {
        alert('임시삭제 성공');
      }

      setGiftInfo((prev) => (prev ? { ...prev, isDeleted: true } : prev));
      // router.push('/user/gifts/disabled');
    } catch (error) {
      console.error('기프티콘 임시삭제 처리 실패:', error);
      alert('임시삭제 처리 중 오류가 발생했습니다.');
    }
  };

  const handleEditClick = () => {
    router.push(`/user/gifts/${id}/edit`);
  };

  return (
    <ViewGiftContainer>
      {/* 이미지 */}
      <GiftImgWrapper>
        <GiftImgText>
          브랜드: {brand}, 상품명: {productName}, 카테고리: {category},
          유효기간: {dueDate}
        </GiftImgText>
        <GiftImg src={imageUrl} alt={productName} priority={true} fill />
        <GiftBadge aria-live="polite">
          <GiftListBadge dueDate={dueDate} />
        </GiftBadge>
        <ExpandButton
          type="button"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <CgArrowsExpandRight size={'90%'} />
        </ExpandButton>
      </GiftImgWrapper>

      {/* 아이콘 버튼 3개 */}
      <IconButtonWrapper>
        <IconButton type="button">
          <LuMail size={'45%'} />
          <IconButtonText>친구에게 양도하기</IconButtonText>
        </IconButton>
        <IconButton type="button" onClick={handleShopsClick}>
          <TbBuildingStore size={'45%'} />
          <IconButtonText>근처 매장 찾기</IconButtonText>
        </IconButton>
        <IconButton type="button" onClick={handleSoftDeleteGift}>
          <FaRegTrashAlt size={'45%'} />
          <IconButtonText>삭제하기</IconButtonText>
        </IconButton>
      </IconButtonWrapper>

      {/* 하단 버튼 2개 */}
      <LongButtonWrapper>
        <Button isLong={true} color={'sub'} onClick={handleEditClick}>
          수정하기
        </Button>
        <Button isLong={true} color={'main'} onClick={handleSoftDeleteGift}>
          사용 완료
        </Button>
      </LongButtonWrapper>

      {/* 이미지 확대 시 모달창 */}
      <ModalDialog
        isOpen={isModalOpen}
        buttonCount={0}
        boxStyle={{
          padding: 0,
          width: '80%',
          backgroundColor: 'transparent',
        }}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <figure
          style={{ maxHeight: '80vh', overflow: 'scroll' }}
          onClick={() => {
            setIsModalOpen(false);
          }}
        >
          <GiftImgText>
            브랜드: {brand}, 상품명: {productName}, 카테고리: {category},
            유효기간: {dueDate}
          </GiftImgText>
          <ExpandedGiftImg
            src={imageUrl}
            alt={productName}
            loading="lazy"
            decoding="async"
          />
        </figure>
      </ModalDialog>
    </ViewGiftContainer>
  );
};

export default ViewGift;
