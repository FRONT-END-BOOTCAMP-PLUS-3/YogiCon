'use client';

import { useId } from 'react';
import styled from 'styled-components';

/* ---------------------------------- style --------------------------------- */
const GiftInfoInputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2.875rem;
`;

const GiftInfoLabel = styled.label`
  color: var(--deepgray);
`;

const GiftInfoInput = styled.input`
  height: 2.5rem;
  border-bottom: 1px solid var(--black);
  &:focus {
    border-bottom: 1px solid var(--main);
  }
`;

const GiftInfoValidText = styled.span<{ $isValid: boolean }>`
  color: ${(props) => (props.$isValid ? 'var(--warning)' : 'var(--safety)')};
  font-size: 0.7rem;
  word-break: keep-all;
`;

/* ----------------------------------- type ---------------------------------- */
type GiftInfoFieldProps = {
  label: string;
  value: string;
  validTest: {
    dueDate: { message: string; isValid: boolean };
    barcode: { message: string; isValid: boolean };
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

/* -------------------------------- component ------------------------------- */
const GiftInfoField = ({
  label,
  value,
  validTest,
  onChange,
}: GiftInfoFieldProps) => {
  const id = useId();

  const fieldKeyMap: { [key: string]: keyof typeof validTest } = {
    유효기간: 'dueDate',
    바코드번호: 'barcode',
  };

  return (
    <GiftInfoInputBox>
      <GiftInfoLabel htmlFor={id}>{label}</GiftInfoLabel>
      <GiftInfoInput
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        required
      />

      {validTest && fieldKeyMap[label] && (
        <GiftInfoValidText $isValid={validTest[fieldKeyMap[label]].isValid}>
          {validTest[fieldKeyMap[label]].message}
        </GiftInfoValidText>
      )}
    </GiftInfoInputBox>
  );
};

export default GiftInfoField;
