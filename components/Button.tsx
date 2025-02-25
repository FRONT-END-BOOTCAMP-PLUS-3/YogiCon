'use client';

import styled from 'styled-components';

type ButtonColor = 'main' | 'sub' | 'white' | 'disabled';

/* ---------------------------------- style --------------------------------- */
const StyledButton = styled.button<{ $isLong: boolean; $color: ButtonColor }>`
  width: 100%;
  min-width: 6.8125rem;
  border-radius: ${({ $isLong }) => ($isLong ? '0.9375rem' : '0.625rem')};
  background-color: ${({ $color }) => {
    switch ($color) {
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
  padding: ${({ $isLong }) => ($isLong ? '0.5rem' : '0.625rem')};
  font-size: 1rem;
  font-weight: bold;
  color: ${({ $color }) =>
    $color === 'white' ? 'var(--black)' : 'var(--white)'};
  line-height: 1.25rem;
  box-shadow: ${({ $isLong }) =>
    $isLong ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : ''};
  cursor: ${({ $color }) =>
    $color === 'disabled' ? 'not-allowed' : 'pointer'};
  border: ${({ $color }) =>
    `1px solid ${$color === 'white' ? 'var(--disabled)' : 'transparent'}`};
`;

/* ---------------------------------- type ---------------------------------- */

type ButtonProps = {
  children?: string;
  type?: 'button' | 'submit' | 'reset';
  isLong: boolean;
  color: ButtonColor;
  onClick?: () => void;
};

/* -------------------------------- component ------------------------------- */
const Button = ({
  children,
  isLong,
  color,
  onClick,
  type = 'button',
}: ButtonProps) => {
  const isDisabled = color === 'disabled';

  return (
    <StyledButton
      type={type}
      $isLong={isLong}
      $color={color}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
