'use client';

import { CreateGiftDto } from '@/application/usecases/gift/dto/CreateGiftDto';
import Button from '@/components/Button';
// import ModalDialog from '@/components/ModalDialog';
import { Categories } from '@/types/Categories';
import { ImageState } from '@/types/ImageState';
import { uploadImageToStorage } from '@/utils/supabase/storage';
// import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CategoryDropDown from './components/CategoryDropDown';
import GiftInfoField from './components/GiftInfoField';
import ImageUpload from './components/ImageUpload';
import { useUserStore } from '@/stores/userStore';

/* ---------------------------------- style --------------------------------- */
const CreateGiftContainer = styled.div`
  padding: 1rem 2.5rem 5rem 2.5rem;
`;

// const CreateGiftImage = styled(Image)`
//   width: 6.375rem;
//   aspect-ratio: 1;
//   height: auto;
// `;

// const ModalBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 1.75rem;
//   margin: 1.75rem 0;
// `;

// const ModalText = styled.p`
//   font-size: 1.25rem;
//   white-space: pre;
//   text-align: center;
//   word-break: keep-all;
//   line-height: 1.5;
// `;

const CreateGiftText = styled.h2`
  margin: 1.75rem 0;
  font-size: 1.1875rem;
  font-weight: bold;
`;

const InputForm = styled.form``;

/* ---------------------------------- type ---------------------------------- */
type InputFields = {
  label: string;
  field: keyof Omit<CreateGiftDto, 'imageUrl' | 'isDeleted' | 'ownerUserId'>;
};

/* -------------------------------- component ------------------------------- */
const CreateGift = () => {
  const router = useRouter();
  const userData = useUserStore((state) => state.userData);
  const userId = userData?.id;

  const [imageState, setImageState] = useState<ImageState>({
    imageFile: null,
    imageSrc: '',
    imageUrl: '',
  });

  const [giftInfo, setGiftInfo] = useState<
    Omit<CreateGiftDto, 'category'> & {
      category: Categories | '';
    }
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
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [validTest, setValidTest] = useState<{
    dueDate: { message: string; isValid: boolean };
    barcode: { message: string; isValid: boolean };
  }>({
    dueDate: { message: '', isValid: false },
    barcode: { message: '', isValid: false },
  });

  useEffect(() => {
    const requiredFields: (keyof CreateGiftDto)[] = [
      'brand',
      'productName',
      'barcode',
      'dueDate',
      'category',
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

  // const handleModal = () => {
  //   setIsModalOpen(true);
  // };

  const handleChange = (field: keyof CreateGiftDto, value: string) => {
    if (field === 'dueDate') {
      if (/^\d{8}$/.test(value)) {
        setValidTest((prev) => ({
          ...prev,
          dueDate: { message: '날짜 형식이 올바릅니다.', isValid: false },
        }));
        const formattedDate = `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;
        setGiftInfo((prev) => ({ ...prev, [field]: formattedDate }));
        return;
      }

      if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        setValidTest((prev) => ({
          ...prev,
          dueDate: { message: '날짜 형식이 올바릅니다.', isValid: false },
        }));
        setGiftInfo((prev) => ({ ...prev, [field]: value }));
        return;
      }

      setValidTest((prev) => ({
        ...prev,
        dueDate: {
          message:
            '날짜 형식이 올바르지 않습니다. YYYYMMDD 또는 YYYY-MM-DD 형식으로 입력해주세요.',
          isValid: true,
        },
      }));
      setGiftInfo((prev) => ({ ...prev, [field]: value }));
      return;
    } else if (field === 'barcode') {
      if (!/^\d+$/.test(value)) {
        setValidTest((prev) => ({
          ...prev,
          barcode: {
            message: '바코드에는 숫자만 들어갈 수 있습니다.',
            isValid: true,
          },
        }));
        setGiftInfo((prev) => ({ ...prev, [field]: value }));
        return;
      }

      setValidTest((prev) => ({
        ...prev,
        barcode: { message: '바코드 형식이 올바릅니다.', isValid: false },
      }));
      setGiftInfo((prev) => ({ ...prev, [field]: value }));
      return;
    }

    setGiftInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(giftInfo);

    if (!imageState.imageFile) {
      alert('기프티콘 이미지를 입력하세요.');
      return;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(giftInfo.dueDate)) {
      alert(
        '날짜 형식이 올바르지 않습니다. YYYYMMDD 또는 YYYY-MM-DD 형식으로 입력해주세요.'
      );
      return;
    }

    if (!/^\d+$/.test(giftInfo.barcode)) {
      alert('바코드 번호 형식이 올바르지 않습니다. 숫자로만 입력해주세요.');
      return;
    }

    // 이미지 업로드 및 기프티콘 정보 저장
    const imageUrl = await uploadImageToStorage(imageState.imageFile);

    if (!imageUrl) {
      setImageState({
        ...imageState,
        imageUrl: '',
      });
      return;
    }

    const updateGiftInfo = { ...giftInfo, imageUrl };

    const response = await fetch(`/api/user/gifts?userId=${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateGiftInfo),
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
      {/* <Button isLong={false} color="main" onClick={handleModal}>
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
      </ModalDialog> */}
      <CreateGiftText>사진 등록</CreateGiftText>
      <ImageUpload imageState={imageState} setImageState={setImageState} />
      <CreateGiftText>기프티콘 정보</CreateGiftText>
      <InputForm onSubmit={handleSubmit}>
        {inputFields.map(({ label, field }) => (
          <GiftInfoField
            key={field}
            label={label}
            value={giftInfo[field]}
            validTest={validTest}
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
