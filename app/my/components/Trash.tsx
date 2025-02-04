import styled from 'styled-components';
import { CiTrash } from 'react-icons/ci';
import { useRouter } from 'next/navigation';

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
  justify-content: space-between;
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
/* ----------------------------------component --------------------------------- */
const Trash = () => {
  const router = useRouter();
  return (
    <Container>
      <Blank />
      <Router onClick={() => router.push('/trash')}>
        <span>휴지통</span>
        <StyledTrashCan />
      </Router>
    </Container>
  );
};

export default Trash;
