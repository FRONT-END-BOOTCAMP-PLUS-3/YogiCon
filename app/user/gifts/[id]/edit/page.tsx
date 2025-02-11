'use client';

import { EditGiftDto } from '@/application/usecases/gift/dto/EditGiftDto';
import Button from '@/components/Button';
import ModalDialog from '@/components/ModalDialog';
import { Categories } from '@/types/Categories';
import { ImageState } from '@/types/ImageState';
import { uploadImageToStorage } from '@/utils/supabase/storage';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CategoryDropDown from './components/CategoryDropDown';
import GiftInfoField from './components/GiftInfoField';
import ImageUpload from './components/ImageUpload';

/* ---------------------------------- style --------------------------------- */
const EditGiftContainer = styled.div`
  padding: 1rem 2.5rem 5rem 2.5rem;
`;

const EditGiftImage = styled(Image)`
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

const EditGiftText = styled.h2`
  margin: 1.75rem 0;
  font-size: 1.1875rem;
  font-weight: bold;
`;

const InputForm = styled.form``;

/* ---------------------------------- type ---------------------------------- */
type InputFields = {
  label: string;
  field: keyof Omit<EditGiftDto, 'imageUrl' | 'isDeleted' | 'ownerUserId'>;
};

/* -------------------------------- component ------------------------------- */
const EditGift = () => {
  const { id } = useParams();
  const router = useRouter();

  const [imageState, setImageState] = useState<ImageState>({
    imageFile: null,
    imageSrc: '',
    imageUrl: '',
  });

  const [giftInfo, setGiftInfo] = useState<
    Omit<EditGiftDto, 'category'> & {
      category: Categories | '';
    }
  >({
    id: '',
    brand: '',
    productName: '',
    barcode: '',
    dueDate: '',
    category: '',
    imageUrl: '',
    isDeleted: false,
    ownerUserId: '',
  });

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
        console.log('기프티콘 데이터: ', data);
        setGiftInfo(data.gift);
        setImageState({
          imageFile: null,
          imageSrc: data.gift.imageUrl,
          imageUrl: data.gift.imageUrl,
        });
      } catch (error) {
        console.error('기프티콘 상세 조회 오류: ', error);
      }
    };

    fetchGiftInfo();
  }, [id]);

  const inputFields: InputFields[] = [
    { label: '업체명', field: 'brand' },
    { label: '상품명', field: 'productName' },
    { label: '바코드번호', field: 'barcode' },
    { label: '유효기간', field: 'dueDate' },
  ];

  const [isFormFilled, setIsFormFilled] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const requiredFields: (keyof EditGiftDto)[] = [
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

  const handleModal = () => {
    setIsModalOpen(true);
  };

  const handleChange = (field: keyof EditGiftDto, value: string) => {
    setGiftInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(giftInfo);

    let imageUrl = giftInfo.imageUrl;

    if (imageState.imageFile) {
      imageUrl = await uploadImageToStorage(imageState.imageFile);
    }

    const updateGiftInfo = { ...giftInfo, imageUrl };
    try {
      const response = await fetch(`/api/user/gifts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateGiftInfo),
      });

      if (response.ok) {
        alert('기프티콘 수정이 완료되었습니다.');
        router.push(`/user/gifts/${id}`);
      } else {
        alert('기프티콘 수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('기프티콘 수정 중 오류 발생:', error);
    }
  };

  if (!giftInfo) return <div>Loading...</div>;

  return (
    <EditGiftContainer>
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
          <EditGiftImage
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
      <EditGiftText>사진 등록</EditGiftText>
      <ImageUpload imageState={imageState} setImageState={setImageState} />
      <EditGiftText>기프티콘 정보</EditGiftText>
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
          수정하기
        </Button>
      </InputForm>
    </EditGiftContainer>
  );
};

export default EditGift;
