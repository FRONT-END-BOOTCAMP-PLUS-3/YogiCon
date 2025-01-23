'use client';

import styled from 'styled-components';

/* ---------------------------------- style --------------------------------- */
const StyledButton = styled.button<ButtonProps>`
  width: 100%;
  min-width: 6.8125rem;
  border-radius: ${({ type }) => (type === 'long' ? '0.9375rem' : '0.625rem')};
  background-color: ${({ color }) => {
    switch (color) {
      case 'main':
        return 'var(--main)';
      case 'sub':
        return 'var(--sub)';
      case 'white':
        return 'var(--white)';
      case 'disabled':
        return 'var(--disabled)';
    }
  }};
  padding: ${({ type }) => (type === 'long' ? '0.5rem' : '0.625rem')};
  font-size: 1rem;
  font-weight: 700;
  color: ${({ color }) =>
    color === 'white' ? 'var(--black)' : 'var(--white)'};
  line-height: 1.25rem;
  box-shadow: ${({ type }) =>
    type === 'long' ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : ''};
  cursor: ${({ color }) => (color === 'disabled' ? 'not-allowed' : 'pointer')};
  border: ${({ color }) =>
    `0.0625rem solid ${color === 'white' ? 'var(--disabled)' : 'transparent'}`};
`;

/* ---------------------------------- type ---------------------------------- */
type ButtonProps = {
  children?: string;
  type: 'long' | 'short';
  color: 'main' | 'sub' | 'white' | 'disabled';
  onClick?: () => void;
};

/* -------------------------------- component ------------------------------- */
const Button = ({ children, type, color, onClick }: ButtonProps) => {
  const isDisabled = color === 'disabled';

  return (
    <StyledButton
      type={type}
      color={color}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
