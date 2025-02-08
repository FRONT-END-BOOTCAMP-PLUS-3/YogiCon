'use client';

import Button from '@/components/Button';
import ModalDialog from '@/components/ModalDialog';
import { Categories } from '@/types/Categories';
import { ImageState } from '@/types/ImageState';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CategoryDropDown from './components/CategoryDropDown';
import GiftInfoField from './components/GiftInfoField';
import ImageUpload from './components/ImageUpload';
import { CreateGiftDto } from '@/application/usecases/gift/dto/CreateGiftDto';
import { useRouter } from 'next/navigation';

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
type InputFields = {
  label: string;
  field: keyof Omit<CreateGiftDto, 'isDeleted' | 'ownerUserId'>;
};

/* -------------------------------- component ------------------------------- */
const CreateGift = () => {
  const router = useRouter();

  const [imageState, setImageState] = useState<ImageState>({
    imageFile: null,
    imageSrc: '',
    imageUrl: '',
  });

  const [giftInfo, setGiftInfo] = useState<
    Omit<CreateGiftDto, 'category' | 'dueDate'> & {
      category: Categories | '';
    } & { dueDate: string }
  >({
    brand: '',
    productName: '',
    barcode: '',
    dueDate: '',
    category: '',
    imageUrl: '',
    isDeleted: false,
    ownerUserId: '',
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
      // imageSrc: imageState.imageSrc,
      imageUrl: imageState.imageUrl,
    }));
  }, [imageState.imageUrl]);

  useEffect(() => {
    const requiredFields: (keyof CreateGiftDto)[] = [
      'brand',
      'productName',
      'barcode',
      'dueDate',
      'category',
      'imageUrl',
    ];

    const allFieldsFilled = requiredFields.every((field) => {
      const value = giftInfo[field];

      if (typeof value === 'string') {
        return value.trim() !== '';
      }
      return !!value;
    });
    setIsFormFilled(allFieldsFilled);
  }, [giftInfo]);

  const handleModal = () => {
    setIsModalOpen(true);
  };

  const handleChange = (field: keyof CreateGiftDto, value: string) => {
    setGiftInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(giftInfo);

    const response = await fetch('/api/user/gifts/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(giftInfo),
    });

    if (response.ok) {
      alert('기프티콘 등록이 완료되었습니다.');
      router.push('/user/gifts');
    } else {
      alert('기프티콘 등록에 실패했습니다.');
    }
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
