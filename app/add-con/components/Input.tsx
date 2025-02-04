'use client';

import styled from 'styled-components';

/* ---------------------------------- style --------------------------------- */
const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputLabel = styled.label`
  font-size: 1rem;
  color: var(--deepgray);
`;

const InputValue = styled.input`
  height: 2.5rem;
  border-bottom: 1px solid var(--black);
  margin-bottom: 2.875rem;
  &:focus {
    border-bottom: 1px solid var(--main);
  }
`;

/* ----------------------------------- type ---------------------------------- */
type InputProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

/* -------------------------------- component ------------------------------- */
const Input = ({ label, value, onChange }: InputProps) => {
  return (
    <InputBox>
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <InputValue
        id={label}
        type="text"
        value={value}
        onChange={onChange}
        required
      ></InputValue>
    </InputBox>
  );
};

export default Input;
