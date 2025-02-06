'use client';

import { srOnly } from '@/app/globalStyles';
import Button from '@/components/Button';
import ModalDialog from '@/components/ModalDialog';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CgArrowsExpandRight } from 'react-icons/cg';
import { FaRegTrashAlt } from 'react-icons/fa';
import { LuMail } from 'react-icons/lu';
import { TbBuildingStore } from 'react-icons/tb';
import styled from 'styled-components';
import { ConInfo } from '../../giftData';

/* ---------------------------------- style --------------------------------- */
const ViewConContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.75rem;
  padding-bottom: 3rem;
`;

const ConImgText = styled.figcaption`
  ${srOnly}
`;
const ConImgWrapper = styled.figure`
  width: 70%;
  aspect-ratio: 3/4;
  position: relative;
  margin-bottom: 1.75rem;
  border: 1px solid var(--gray);
  border-radius: 0.625rem;
`;
const ConImg = styled(Image)`
  object-fit: contain;
`;
const ConBadge = styled.div`
  position: absolute;
  top: -1.5rem;
  right: -1.5rem;
  width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: var(--warning);
  color: var(--white);
  font-size: 1.125rem;
  font-weight: bold;
  letter-spacing: -0.02rem;
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

const ExpandedConImg = styled.img`
  width: 100%;
  border-radius: 1rem;
`;

/* ---------------------------------- type ---------------------------------- */

/* -------------------------------- component ------------------------------- */
const ViewCon = () => {
  const { id } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [conInfo, setConInfo] = useState<ConInfo | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchConInfo = async () => {
      try {
        const res = await fetch(`/api/view-con/${id}`);

        if (!res.ok) {
          throw new Error('Response Error');
        }

        const data = await res.json();
        setConInfo(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error('An unexpected error occurred');
        }
      }
    };

    fetchConInfo();
  }, [id]);

  if (!conInfo) return <div>Loading...</div>;

  const { imageUrl, brand, category, duedate, productName } = conInfo;

  return (
    <ViewConContainer>
      {/* 이미지 */}
      <ConImgWrapper>
        <ConImgText>
          브랜드: {brand}, 상품명: {productName}, 카테고리: {category},
          유효기간: {duedate}
        </ConImgText>
        <ConImg src={imageUrl} alt={productName} priority={true} fill />
        <ConBadge>
          <div aria-live="polite">D-1</div>
        </ConBadge>
        <ExpandButton
          type="button"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <CgArrowsExpandRight size={'90%'} />
        </ExpandButton>
      </ConImgWrapper>

      {/* 아이콘 버튼 3개 */}
      <IconButtonWrapper>
        <IconButton type="button">
          <LuMail size={'45%'} />
          <IconButtonText>친구에게 양도하기</IconButtonText>
        </IconButton>
        <IconButton type="button">
          <TbBuildingStore size={'45%'} />
          <IconButtonText>근처 매장 찾기</IconButtonText>
        </IconButton>
        <IconButton type="button">
          <FaRegTrashAlt size={'45%'} />
          <IconButtonText>삭제하기</IconButtonText>
        </IconButton>
      </IconButtonWrapper>

      {/* 하단 버튼 2개 */}
      <LongButtonWrapper>
        <Button isLong={true} color={'sub'}>
          수정하기
        </Button>
        <Button isLong={true} color={'main'}>
          사용 완료
        </Button>
      </LongButtonWrapper>

      {/* 이미지 확대 시 모달창 */}
      <ModalDialog
        isOpen={isModalOpen}
        buttonCount={0}
        boxStyle={{
          padding: 0,
          width: '75%',
          backgroundColor: 'transparent',
        }}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <figure
          onClick={() => {
            setIsModalOpen(false);
          }}
        >
          <ConImgText>
            브랜드: {brand}, 상품명: {productName}, 카테고리: {category},
            유효기간: {duedate}
          </ConImgText>
          <ExpandedConImg
            src={imageUrl}
            alt={productName}
            loading="lazy"
            decoding="async"
          />
        </figure>
      </ModalDialog>
    </ViewConContainer>
  );
};

export default ViewCon;
