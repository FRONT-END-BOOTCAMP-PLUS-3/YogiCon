'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styled from 'styled-components';

import ModalDialog from '@/components/ModalDialog';
import Alarm from './components/Alarm';
import MyButton from './components/MyButton';
import Name from './components/Name';

/* ---------------------------------- style --------------------------------- */
const MyContainer = styled.div`
  background-color: var(--lightgray);
  height: calc(100vh - 1.5rem);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.2rem;
  gap: 1.2rem;
  align-items: center;
  h3 {
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: -0.02rem;
  }
  span {
    font-size: 1.1rem;
    letter-spacing: -0.02rem;
  }
`;

/* ---------------------------------- component --------------------------------- */
const My = () => {
  const router = useRouter();

  const [actionType, setActionType] = useState<'logout' | 'deleteID' | null>(
    null
  );

  const openModal = (type: 'logout' | 'deleteID') => {
    setActionType(type);
  };

  const closeModal = () => {
    setActionType(null);
  };

  const handleConfirm = () => {
    if (actionType === 'logout') {
      console.log('로그아웃 실행');
      router.push('/');
    } else if (actionType === 'deleteID') {
      console.log('회원탈퇴 실행');
      router.push('/');
    }
    closeModal();
  };

  return (
    <MyContainer>
      <Name />
      <Alarm />
      <MyButton
        id="trash"
        onClick={() => router.push('/user/gifts/disabled')}
      />
      <MyButton id="logout" onClick={() => openModal('logout')} />
      <MyButton id="deleteID" onClick={() => openModal('deleteID')} />

      <ModalDialog
        isOpen={actionType !== null}
        buttonCount={2}
        onConfirm={handleConfirm}
        onClose={closeModal}
      >
        <ModalContent>
          {actionType === 'logout' ? (
            <>
              <h3>로그아웃</h3>
              <span>정말 로그아웃 하시겠습니까?</span>
            </>
          ) : (
            <>
              <h3>회원 탈퇴</h3>
              <span>정말 탈퇴 하시겠습니까?</span>
            </>
          )}
        </ModalContent>
      </ModalDialog>
    </MyContainer>
  );
};

export default My;
