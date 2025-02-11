'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import ModalDialog from '@/components/ModalDialog';
import Alarm from './components/Alarm';
import MyButton from './components/MyButton';
import Name from './components/Name';
import { getUserInfo } from '../api/(anon)/auth/userInfo';
import { supabase } from '@/utils/supabase/supabase';

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
  const [userInfo, setUserInfo] = useState<any>(null);
  const [actionType, setActionType] = useState<'logout' | 'deleteID' | null>(
    null
  );

  const saveUserToSupabase = async (userData: any) => {
    if (!userData.id || !userData.kakao_account?.profile?.nickname) {
      console.error('[Supabase] 사용자 정보가 올바르지 않습니다.', userData);
      return;
    }

    const userToSave = {
      id: userData.id.toString(),
      email: userData.kakao_account?.email || null,
      nickname: userData.kakao_account?.profile?.nickname,
      profile_image: userData.kakao_account?.profile?.profile_image_url || null,
    };

    try {
      // 유저 조회
      let { data: existingUser, error: selectError } = await supabase
        .from('user')
        .select('id')
        .eq('id', userToSave.id)
        .single();

      if (existingUser) {
        console.log('[Supabase] 기존 사용자 존재:', existingUser);
        return;
      }

      const {} = await supabase.from('user').insert([userToSave]);
    } catch (error) {
      console.error('[Supabase] 저장 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const userData = await getUserInfo(accessToken);
        setUserInfo(userData);
        await saveUserToSupabase(userData); //유저 데이터 supabase에 저장
      } catch (err) {
        console.error('사용자 정보를 불러오지 못했습니다.', err);
      }
    };

    fetchUserInfo();
  }, [router]);

  const deleteUserFromSupabase = async (id: string) => {
    try {
      const { error } = await supabase.from('user').delete().eq('id', id);
      if (error) {
        console.error('[Supabase] 회원 탈퇴 오류:', error.message);
        return false;
      }
      console.log('[Supabase] 회원 삭제 완료:', id);
      return true;
    } catch (error) {
      console.error('[Supabase] 회원 삭제 중 오류 발생:', error);
      return false;
    }
  };

  const unlinkKakaoAccount = async (accessToken: string) => {
    try {
      const response = await fetch('https://kapi.kakao.com/v1/user/unlink', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error_description || '카카오 계정 해제 실패');
      }

      console.log('[Kakao] 계정 연결 해제 완료:', data);
      return true;
    } catch (error) {
      console.error('[Kakao] 계정 해제 중 오류 발생:', error);
      return false;
    }
  };

  const openModal = (type: 'logout' | 'deleteID') => {
    setActionType(type);
  };

  const closeModal = () => {
    setActionType(null);
  };

  const handleConfirm = () => {
    if (actionType === 'logout') {
      localStorage.removeItem('access_token'); //로그아웃 시 access_token 과 user_info 삭제
      localStorage.removeItem('user_info');
      router.push('/');
    } else if (actionType === 'deleteID') {
      deleteUserFromSupabase(userInfo.id);
      unlinkKakaoAccount(localStorage.getItem('access_token') || '');
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_info');
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
