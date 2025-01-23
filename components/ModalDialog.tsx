'use client';

import useBodyScrollLock from '@/hooks/useBodyScrollLock';
import { MouseEvent, ReactNode } from 'react';
import styled from 'styled-components';
import Button from './Button';

/* ------------------------------- style ------------------------------ */
const OverLayBox = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
`;
const DialogBox = styled.div`
  background-color: var(--white);
  position: absolute;
  left: 50%;
  top: 50vh;
  translate: -50% -50%;
  padding: 1.4375rem 1.6875rem;
  border-radius: 0.9375rem;
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 1.75rem;
`;

/* -------------------------------- type ------------------------------- */
type ModalDialogProps = {
  children: ReactNode;
  type: 'one-button' | 'two-button';
  isOpen: boolean;
  onConfirm?: () => void;
  onClose: () => void;
};

/* -------------------------------- component ------------------------------- */
const ModalDialog = ({
  children,
  type,
  isOpen,
  onConfirm,
  onClose,
}: ModalDialogProps) => {
  useBodyScrollLock(isOpen);

  const handleOverLayClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const renderButtons = () => {
    if (type === 'one-button') {
      return (
        <Button type="short" color="main" onClick={onClose}>
          예
        </Button>
      );
    } else if (type === 'two-button') {
      return (
        <ButtonWrapper>
          <Button type="short" color="main" onClick={onConfirm}>
            예
          </Button>
          <Button type="short" color="white" onClick={onClose}>
            아니오
          </Button>
        </ButtonWrapper>
      );
    }
  };

  return (
    <>
      {isOpen && (
        <OverLayBox onClick={handleOverLayClick}>
          <DialogBox role="dialog" aria-modal="true" tabIndex={-1}>
            {children}
            {renderButtons()}
          </DialogBox>
        </OverLayBox>
      )}
    </>
  );
};

export default ModalDialog;
