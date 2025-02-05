'use client';

import Button from '@/components/Button';
import ModalDialog from '@/components/ModalDialog';
import { CategoryListItem } from '@/types/categories';
import { ImageState } from '@/types/ImageState';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CategoryDropDown from './components/CategoryDropDown';
import ConInfoField from './components/ConInfoField';
import ImageUpload from './components/ImageUpload';

/* ---------------------------------- style --------------------------------- */
const AddConContainer = styled.div`
  padding: 1rem 2.5rem 5rem 2.5rem;
`;

const AddConImage = styled(Image)`
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

const AddConText = styled.h2`
  margin: 1.75rem 0;
  font-size: 1.1875rem;
  font-weight: bold;
`;

const InputForm = styled.form``;

/* ---------------------------------- type ---------------------------------- */
type ConInfo = {
  brand: string;
  productName: string;
  barcode: string;
  dueDate: string;
  category: CategoryListItem | '';
  imageSrc: string;
};

type InputFields = {
  label: string;
  field: keyof Omit<ConInfo, 'category'>;
};

/* -------------------------------- component ------------------------------- */
const AddCon = () => {
  const [imageState, setImageState] = useState<ImageState>({
    imageFile: null,
    imageSrc: '',
    imageUrl: '',
  });

  const [conInfo, setConInfo] = useState<ConInfo>({
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
    setConInfo((prev) => ({
      ...prev,
      imageSrc: imageState.imageSrc,
    }));
  }, [imageState.imageSrc]);

  useEffect(() => {
    const allFieldsFilled = Object.values(conInfo).every(
      (value) => value.trim() !== ''
    );
    setIsFormFilled(allFieldsFilled);
  }, [conInfo]);

  const handleModal = () => {
    setIsModalOpen(true);
  };

  const handleChange = (field: keyof ConInfo, value: string) => {
    setConInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('form Data:', conInfo);
  };

  return (
    <AddConContainer>
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
          <AddConImage
            src="/add_con_image.png"
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
      <AddConText>사진 등록</AddConText>
      <ImageUpload imageState={imageState} setImageState={setImageState} />
      <AddConText>기프티콘 정보</AddConText>
      <InputForm onSubmit={handleSubmit}>
        {inputFields.map(({ label, field }) => (
          <ConInfoField
            key={field}
            label={label}
            value={conInfo[field]}
            onChange={(e) => handleChange(field, e.target.value)}
          />
        ))}
        <CategoryDropDown
          selectedCategory={conInfo.category}
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
    </AddConContainer>
  );
};

export default AddCon;
