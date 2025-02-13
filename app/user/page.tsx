/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import ModalDialog from '@/components/ModalDialog';
import Alarm from './components/Alarm';
import MyButton from './components/MyButton';
import Name from './components/Name';
import { useUserStore } from '@/stores/userStore';

/* ---------------------------------- style --------------------------------- */
const MyContainer = styled.div`
  background-color: var(--lightgray);
  height: calc(100vh - 1.5rem);
  overflow-y: auto;
  padding-bottom: 6.5rem;
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
  const [userInfo, setUserInfo] = useState<any>(null);
  const [actionType, setActionType] = useState<'logout' | 'deleteID' | null>(
    null
  );

  // zustand 스토어 관련 함수
  const { setUserData, clearUserData } = useUserStore();

  // 페이지 로드 시 access token을 사용해 사용자 정보를 API를 통해 가져옴
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) return;

    const fetchUserInfo = async () => {
      try {
        const response = await fetch('/api', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'loadUser', accessToken }),
        });
        const userInfo = await response.json();
        setUserInfo(userInfo);
        console.log(userInfo);
        // zustand 스토어에 사용자 정보를 저장
        setUserData(userInfo);
        console.log();
      } catch (error) {
        console.error('사용자 정보를 불러오지 못했습니다.', error);
      }
    };

    fetchUserInfo();
  }, [router, setUserData]);

  const openModal = (type: 'logout' | 'deleteID') => {
    setActionType(type);
  };

  const closeModal = () => {
    setActionType(null);
  };

  // 로그아웃 및 회원 탈퇴 시 API 엔드포인트를 호출
  const handleConfirm = async () => {
    const accessToken = localStorage.getItem('access_token');
    if (actionType === 'logout') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user-storage');
      clearUserData();
      router.push('/');
    } else if (actionType === 'deleteID') {
      try {
        await fetch('/api', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'deleteAccount',
            accessToken,
            userId: userInfo?.id,
          }),
        });
      } catch (error) {
        console.error('회원 탈퇴 처리 중 오류 발생:', error);
      }
      localStorage.removeItem('access_token');
      localStorage.removeItem('user-storage');
      clearUserData();
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
