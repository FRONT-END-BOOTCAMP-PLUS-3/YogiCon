import styled from 'styled-components';

/* ---------------------------------- style --------------------------------- */
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Blank = styled.div`
  height: 1.75rem;
  background-color: var(--lightgray);
`;

const Router = styled.div`
  display: flex;
  height: 3.75rem;
  align-items: center;
  padding-left: 1.69rem;
  span {
    font-size: 1.25rem;
    letter-spacing: -0.02rem;
    font-weight: bold;
    color: var(--main);
  }
`;
/* ---------------------------------- component --------------------------------- */
const DeleteID = () => {
  return (
    <Container>
      <Blank />
      <Router>
        <span>회원탈퇴</span>
      </Router>
    </Container>
  );
};

export default DeleteID;
