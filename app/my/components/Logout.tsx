import styled from 'styled-components';
import { IoIosLogOut } from 'react-icons/io';
/* ---------------------------------- style --------------------------------- */

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Blank = styled.div`
  height: 1.75rem;
  background-color: var(--lightgray);
`;

const LogoutRouter = styled.div`
  display: flex;
  height: 3.75rem;
  align-items: center;
  padding-left: 1.69rem;
  justify-content: space-between;
  span {
    font-size: 1.25rem;
    letter-spacing: -0.02rem;
    font-weight: bold;
  }
`;

const StyledLogo = styled(IoIosLogOut)`
  width: 2.125rem;
  height: 2.125rem;
  display: flex;
  color: var(--deepgray);
  margin-right: 1.6rem;
`;
/* ---------------------------------- component --------------------------------- */
const Logout = () => {
  return (
    <Container>
      <Blank />
      <LogoutRouter>
        <span>로그아웃</span>
        <StyledLogo />
      </LogoutRouter>
    </Container>
  );
};

export default Logout;
