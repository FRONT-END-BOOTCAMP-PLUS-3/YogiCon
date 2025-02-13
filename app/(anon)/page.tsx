'use client';
import styled from 'styled-components';
import { RiKakaoTalkFill } from 'react-icons/ri';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LoginContainer = styled.div`
  height: 100vh;
  padding: 0 30px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: var(--sub);
`;

const LoginTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const LoginLogoText = styled.h1`
  font-family: 'Caprasimo', sans-serif;
  font-size: 3.2rem;
  color: var(--main);
`;

const LoginMiddleText = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.3rem;
  font-weight: bold;
  line-height: 1.3;
  word-break: keep-all;
`;

const LoginMiddleTextSpan = styled.span`
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 0;
`;

const LoginMiddleStyledDiv = styled.div`
  width: 95%;
  height: 0.7rem;
  position: absolute;
  bottom: -0.15rem;
  background-color: #fee500;
  z-index: -1;
`;

const LoginButton = styled(Link)`
  border: none;
  background-color: #fee500;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.7rem;
  padding: 0.75rem 0.5rem;
  border-radius: 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  color: var(--black);

  & svg {
    font-size: 1.5rem;
    color: #392020;
  }
`;

export default function Login() {
  const router = useRouter();
  const clientId = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const redirectUri = 'https://yogicon.vercel.app/auth/callback';
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code`;

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      router.push('/user');
    }
  });

  return (
    <LoginContainer>
      <LoginTextContainer>
        <LoginLogoText>YOGICON</LoginLogoText>
        <LoginMiddleText>
          <span>쌓아두고 잊혀지는 기프티콘,</span>
          <LoginMiddleTextSpan>
            이제 그만!
            <LoginMiddleStyledDiv />
          </LoginMiddleTextSpan>
        </LoginMiddleText>
      </LoginTextContainer>

      <div style={{ paddingTop: '1.5rem' }} />

      <LoginButton href={kakaoAuthUrl}>
        <RiKakaoTalkFill />
        <span>카카오로 계속하기</span>
      </LoginButton>
    </LoginContainer>
  );
}
