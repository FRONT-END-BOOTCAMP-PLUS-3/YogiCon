import styled from 'styled-components';
import BackButton from '../BackButton';
import { usePathname } from 'next/navigation';

/* ---------------------------------- style --------------------------------- */
const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: fixed;
  left: 50%;
  translate: -50% 0;
  height: 3.375rem;
  background-color: var(--white);
  z-index: 9998;
`;
const TitleText = styled.h1`
  font-weight: 700;
  font-size: 1.5625rem;
  letter-spacing: -0.02rem;
  color: var(--main);
  text-align: center;
`;
const SpacerBox = styled.div`
  padding-top: 3.375rem;
`;

/* -------------------------------- component ------------------------------- */
const BackButtonHeader = () => {
  const pathname = usePathname();
  const headerComponents: { [key: string]: string } = {
    '/map': '근처 매장 찾기',
    '/trash': '휴지통',
    '/add-con': '기프티콘 등록',
    '/view-con': '기프티콘 상세',
  };
  const headerText = headerComponents[pathname];

  return (
    <>
      <StyledHeader>
        <BackButton />
        <TitleText>{headerText}</TitleText>
      </StyledHeader>
      <SpacerBox></SpacerBox>
    </>
  );
};

export default BackButtonHeader;
