'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  p {
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: -0.02rem;
  }
`;

const Callback = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const authCode: string | null = searchParams.get('code');

  useEffect(() => {
    if (!authCode) {
      window.location.href = '/';
      return;
    }

    const fetchToken = async () => {
      try {
        const response = await fetch('/api', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'login', authCode }),
        });
        const { token } = await response.json();

        localStorage.setItem('access_token', token);

        router.push('/user');
      } catch (error) {
        console.error('토큰 요청 실패:', error);
      }
    };

    fetchToken();
  }, [authCode, router]);

  return (
    <Container>
      <p>로그인 중...</p>
    </Container>
  );
};

export default Callback;
