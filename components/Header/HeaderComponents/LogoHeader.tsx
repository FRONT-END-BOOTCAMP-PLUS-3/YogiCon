'use client';

import styled from 'styled-components';
import { usePathname } from 'next/navigation';

/* ---------------------------------- style --------------------------------- */
const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 0.9375rem;
  position: fixed;
  left: 50%;
  translate: -50% 0;
  height: 1.5rem;
`;
const TitleText = styled.h1<{ $isHome: boolean }>`
  font-weight: 700;
  font-size: 1.5625rem;
  letter-spacing: -0.02rem;
  color: var(--main);
  font-family: ${(props) =>
    props.$isHome ? "'Caprasimo', sans-serif" : 'sans-serif'};
`;
const SpacerBox = styled.div`
  width: 100%;
  padding-top: 1.5rem;
`;

/* -------------------------------- component ------------------------------- */
const LogoHeader = () => {
  const pathname = usePathname();

  // 페이지 경로에 따른 제목
  const headerComponents: { [key: string]: string } = {
    '/': 'YOGICON',
    '/my': '마이페이지',
  };

  const headerText = headerComponents[pathname] || 'YOGICON'; // 기본값 설정
  const isHome = pathname === '/';

  return (
    <>
      <StyledHeader>
        <TitleText $isHome={isHome}>{headerText}</TitleText>
      </StyledHeader>
      <SpacerBox></SpacerBox>
    </>
  );
};

export default LogoHeader;
