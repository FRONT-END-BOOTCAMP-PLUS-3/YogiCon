'use client';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  cursor: pointer;
  img {
    width: 60%;
  }
`;

const Page = () => {
  const clientId = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const redirectUri = 'http://localhost:3000/auth/callback';
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoAuthUrl;
  };

  return (
    <Container onClick={handleLogin}>
      <img src="kakao_login_large_narrow.png"></img>
    </Container>
  );
};

export default Page;
