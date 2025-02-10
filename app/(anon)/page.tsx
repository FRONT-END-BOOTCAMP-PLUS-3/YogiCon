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
  const handleLogin = () => {
    window.location.href = '/api/auth/login';
  };
  return (
    <Container onClick={handleLogin}>
      <img src="kakao_login_large_narrow.png"></img>
    </Container>
  );
};

export default Page;
