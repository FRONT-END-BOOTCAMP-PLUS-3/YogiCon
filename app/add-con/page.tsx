'use client';

import Button from '@/components/Button';
import { CategoryListItem } from '@/types/categories';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import DropDownComponent from './components/DropDown';
import ImageUpload from './components/ImageUpload';
import InputComponent from './components/Input';

/* ---------------------------------- style --------------------------------- */
const AddConContainer = styled.div`
  padding: 1rem 2.5rem 5rem 2.5rem;
`;

const AddConText = styled.h3`
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
};

type InputFields = {
  label: string;
  field: keyof Omit<ConInfo, 'category'>;
};

/* -------------------------------- component ------------------------------- */
const AddCon = () => {
  const [conInfo, setConInfo] = useState<ConInfo>({
    brand: '',
    productName: '',
    barcode: '',
    dueDate: '',
    category: '',
  });

  const inputFields: InputFields[] = [
    { label: '업체명', field: 'brand' },
    { label: '상품명', field: 'productName' },
    { label: '바코드번호', field: 'barcode' },
    { label: '유효기간', field: 'dueDate' },
  ];

  const [isFormFilled, setIsFormFilled] = useState<Boolean>(false);

  useEffect(() => {
    const allFieldsFilled = Object.values(conInfo).every(
      (value) => value.trim() !== ''
    );
    setIsFormFilled(allFieldsFilled);
  }, [conInfo]);

  const handleChange = (field: keyof ConInfo, value: string) => {
    setConInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('form Data:', conInfo);
  };

  return (
    <AddConContainer>
      <AddConText>사진 등록</AddConText>
      <ImageUpload></ImageUpload>
      <AddConText>기프티콘 정보</AddConText>
      <InputForm onSubmit={handleSubmit}>
        {inputFields.map(({ label, field }) => (
          <InputComponent
            key={field}
            label={label}
            value={conInfo[field]}
            onChange={(e) => handleChange(field, e.target.value)}
          ></InputComponent>
        ))}
        <DropDownComponent
          selectedCategory={conInfo.category}
          onChange={(e) => handleChange('category', e.target.value)}
        ></DropDownComponent>
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
