'use client';

import { useId } from 'react';
import styled from 'styled-components';

/* ---------------------------------- style --------------------------------- */
const ConInfoInputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ConInfoLabel = styled.label`
  color: var(--deepgray);
`;

const ConInfoInput = styled.input`
  height: 2.5rem;
  border-bottom: 1px solid var(--black);
  margin-bottom: 2.875rem;
  &:focus {
    border-bottom: 1px solid var(--main);
  }
`;

/* ----------------------------------- type ---------------------------------- */
type ConInfoFieldProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

/* -------------------------------- component ------------------------------- */
const ConInfoField = ({ label, value, onChange }: ConInfoFieldProps) => {
  const id = useId();

  return (
    <ConInfoInputBox>
      <ConInfoLabel htmlFor={id}>{label}</ConInfoLabel>
      <ConInfoInput
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        required
      />
    </ConInfoInputBox>
  );
};

export default ConInfoField;
