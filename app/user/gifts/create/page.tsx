'use client';

import Button from '@/components/Button';
import ModalDialog from '@/components/ModalDialog';
import { CategoryListItem } from '@/types/Categories';
import { ImageState } from '@/types/ImageState';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CategoryDropDown from './components/CategoryDropDown';
import GiftInfoField from './components/GiftInfoField';
import ImageUpload from './components/ImageUpload';

/* ---------------------------------- style --------------------------------- */
const CreateGiftContainer = styled.div`
  padding: 1rem 2.5rem 5rem 2.5rem;
`;

const CreateGiftImage = styled(Image)`
  width: 6.375rem;
  aspect-ratio: 1;
  height: auto;
`;

const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;
  margin: 1.75rem 0;
`;

const ModalText = styled.p`
  font-size: 1.25rem;
  white-space: pre;
  text-align: center;
  word-break: keep-all;
  line-height: 1.5;
`;

const CreateGiftText = styled.h2`
  margin: 1.75rem 0;
  font-size: 1.1875rem;
  font-weight: bold;
`;

const InputForm = styled.form``;

/* ---------------------------------- type ---------------------------------- */
type GiftInfo = {
  brand: string;
  productName: string;
  barcode: string;
  dueDate: string;
  category: CategoryListItem | '';
  imageSrc: string;
};

type InputFields = {
  label: string;
  field: keyof Omit<GiftInfo, 'category'>;
};

/* -------------------------------- component ------------------------------- */
const CreateGift = () => {
  const [imageState, setImageState] = useState<ImageState>({
    imageFile: null,
    imageSrc: '',
    imageUrl: '',
  });

  const [giftInfo, setGiftInfo] = useState<GiftInfo>({
    brand: '',
    productName: '',
    barcode: '',
    dueDate: '',
    category: '',
    imageSrc: '',
  });

  const inputFields: InputFields[] = [
    { label: '업체명', field: 'brand' },
    { label: '상품명', field: 'productName' },
    { label: '바코드번호', field: 'barcode' },
    { label: '유효기간', field: 'dueDate' },
  ];

  const [isFormFilled, setIsFormFilled] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setGiftInfo((prev) => ({
      ...prev,
      imageSrc: imageState.imageSrc,
    }));
  }, [imageState.imageSrc]);

  useEffect(() => {
    const allFieldsFilled = Object.values(giftInfo).every(
      (value) => value.trim() !== ''
    );
    setIsFormFilled(allFieldsFilled);
  }, [giftInfo]);

  const handleModal = () => {
    setIsModalOpen(true);
  };

  const handleChange = (field: keyof GiftInfo, value: string) => {
    setGiftInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('form Data:', giftInfo);
  };

  return (
    <CreateGiftContainer>
      <Button isLong={false} color="main" onClick={handleModal}>
        정보입력확인모달창
      </Button>
      <ModalDialog
        buttonCount={1}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <ModalBox>
          <CreateGiftImage
            src="/create_gift_image.png"
            alt="등록캐릭터"
            width={102}
            height={102}
          />
          <ModalText>
            {'AI가 사진을 자동인식하여\n정보를 채워넣었어요.\n'}
            <strong>틀린 부분</strong>
            {'이 있을 수 있으니\n꼭 체크해주세요!'}
          </ModalText>
        </ModalBox>
      </ModalDialog>
      <CreateGiftText>사진 등록</CreateGiftText>
      <ImageUpload imageState={imageState} setImageState={setImageState} />
      <CreateGiftText>기프티콘 정보</CreateGiftText>
      <InputForm onSubmit={handleSubmit}>
        {inputFields.map(({ label, field }) => (
          <GiftInfoField
            key={field}
            label={label}
            value={giftInfo[field]}
            onChange={(e) => handleChange(field, e.target.value)}
          />
        ))}
        <CategoryDropDown
          selectedCategory={giftInfo.category}
          onChange={(e) => handleChange('category', e.target.value)}
        />
        <Button
          type="submit"
          isLong={true}
          color={isFormFilled ? 'main' : 'disabled'}
        >
          등록하기
        </Button>
      </InputForm>
    </CreateGiftContainer>
  );
};

export default CreateGift;
