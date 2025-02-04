'use client';

import styled from 'styled-components';

/* ---------------------------------- style --------------------------------- */
const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 768px;
  padding: 0.5rem 0.9375rem 0 0.9375rem;
  position: fixed;
  background-color: var(--white);
  z-index: 9998;
`;
const TitleText = styled.h1<{ $isHome: boolean }>`
  font-weight: 700;
  font-size: 1.375rem;
  line-height: 1.5rem;
  letter-spacing: -0.02rem;
  color: var(--main);
  font-family: ${(props) =>
    props.$isHome ? "'Caprasimo', sans-serif" : 'sans-serif'};
`;
const SpacerBox = styled.div`
  width: 100%;
  padding-top: 2rem;
`;

/* ---------------------------------- type ---------------------------------- */
type LogoHeaderProps = {
  pathname: string;
};

/* -------------------------------- component ------------------------------- */
const LogoHeader = ({ pathname }: LogoHeaderProps) => {
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
