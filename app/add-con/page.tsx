'use client';

import { useState } from 'react';
import styled from 'styled-components';
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
};

type InputFields = {
  label: string;
  field: keyof ConInfo;
};

/* -------------------------------- component ------------------------------- */
const AddCon = () => {
  const [conInfo, setConInfo] = useState<ConInfo>({
    brand: '',
    productName: '',
    barcode: '',
    dueDate: '',
  });

  const inputFields: InputFields[] = [
    { label: '업체명', field: 'brand' },
    { label: '상품명', field: 'productName' },
    { label: '바코드번호', field: 'barcode' },
    { label: '유효기간', field: 'dueDate' },
  ];

  const handleChange = (field: keyof ConInfo, value: string) => {
    setConInfo((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <AddConContainer>
      <AddConText>사진 등록</AddConText>
      <AddConText>기프티콘 정보</AddConText>
      <InputForm>
        {inputFields.map(({ label, field }) => (
          <InputComponent
            key={field}
            label={label}
            value={conInfo[field]}
            onChange={(e) => handleChange(field, e.target.value)}
          ></InputComponent>
        ))}
      </InputForm>
    </AddConContainer>
  );
};

export default AddCon;
