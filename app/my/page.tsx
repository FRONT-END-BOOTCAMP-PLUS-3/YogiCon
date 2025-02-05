// My.tsx (페이지 컴포넌트)
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styled from 'styled-components';

import Alarm from '@/app/my/components/Alarm';
import MyButton from '@/app/my/components/MyButton';
import Name from '@/app/my/components/Name';
import ModalDialog from '@/components/ModalDialog';

/* ---------------------------------- style --------------------------------- */
const MyContainer = styled.div`
  background-color: var(--lightgray);
  height: calc(100vh - 1.5rem);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ModalContent = styled.div`
  margin-bottom: 1rem;
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
      router.push('/login');
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
      <MyButton id="trash" onClick={() => router.push('/trash')} />
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
            <span>정말 로그아웃 하시겠습니까?</span>
          ) : (
            <span>정말 탈퇴 하시겠습니까?</span>
          )}
        </ModalContent>
      </ModalDialog>
    </MyContainer>
  );
};

export default My;
