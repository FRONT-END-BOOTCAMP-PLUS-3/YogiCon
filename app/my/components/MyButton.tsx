import { useRouter } from 'next/navigation';
import { CiTrash } from 'react-icons/ci';
import { IoIosLogOut } from 'react-icons/io';
import styled from 'styled-components';
/* ---------------------------------- style --------------------------------- */

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const TrashRouter = styled.div`
  display: flex;
  height: 3.75rem;
  align-items: center;
  padding-left: 1.69rem;
  justify-content: space-between;
  background-color: var(--white);
  span {
    font-size: 1.25rem;
    letter-spacing: -0.02rem;
    font-weight: bold;
  }
`;

const StyledTrashCan = styled(CiTrash)`
  width: 2.125rem;
  height: 2.125rem;
  display: flex;
  color: var(--deepgray);
  margin-right: 1.69rem;
`;

const LogoutRouter = styled.div`
  display: flex;
  height: 3.75rem;
  align-items: center;
  padding-left: 1.69rem;
  justify-content: space-between;
  background-color: var(--white);
  span {
    font-size: 1.25rem;
    letter-spacing: -0.02rem;
    font-weight: bold;
  }
`;
const DeleteRouter = styled.div`
  display: flex;
  height: 3.75rem;
  align-items: center;
  padding-left: 1.69rem;
  background-color: var(--white);
  span {
    font-size: 1.25rem;
    letter-spacing: -0.02rem;
    font-weight: bold;
    color: var(--main);
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
const MyButton = () => {
  const router = useRouter();
  return (
    <Container>
      <TrashRouter onClick={() => router.push('/trash')}>
        <span>휴지통</span>
        <StyledTrashCan />
      </TrashRouter>
      <LogoutRouter>
        <span>로그아웃</span>
        <StyledLogo />
      </LogoutRouter>
      <DeleteRouter>
        <span>회원탈퇴</span>
      </DeleteRouter>
    </Container>
  );
};

export default MyButton;
