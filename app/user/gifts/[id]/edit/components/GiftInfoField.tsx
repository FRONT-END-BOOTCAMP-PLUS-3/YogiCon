'use client';

import { useId } from 'react';
import styled from 'styled-components';

/* ---------------------------------- style --------------------------------- */
const GiftInfoInputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const GiftInfoLabel = styled.label`
  color: var(--deepgray);
`;

const GiftInfoInput = styled.input`
  height: 2.5rem;
  border-bottom: 1px solid var(--black);
  margin-bottom: 2.875rem;
  &:focus {
    border-bottom: 1px solid var(--main);
  }
`;

/* ----------------------------------- type ---------------------------------- */
type GiftInfoFieldProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

/* -------------------------------- component ------------------------------- */
const GiftInfoField = ({ label, value, onChange }: GiftInfoFieldProps) => {
  const id = useId();

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
    </GiftInfoInputBox>
  );
};

export default GiftInfoField;
