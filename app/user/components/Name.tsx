import { LuUserRound } from 'react-icons/lu';
import styled from 'styled-components';
import { useUserStore } from '@/stores/userStore';

/* ---------------------------------- style --------------------------------- */
const NameContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1.69rem 1.75rem;
  gap: 0.5rem;
  background-color: var(--white);
`;

const StyledIcon = styled(LuUserRound)`
  font-size: 2.25rem;
  color: var(--deepgray);
`;

const NameStyle = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02rem;
  span {
    color: var(--main);
  }
`;
/* ---------------------------------- component --------------------------------- */
const Name = () => {
  const { userData } = useUserStore();
  const getUsername = () => {
    const username = userData?.nickname;
    return username || 'Guest';
  };
  const username = getUsername();

  return (
    <NameContainer>
      <StyledIcon />
      <NameStyle>
        <span>{username}</span>님
      </NameStyle>
    </NameContainer>
  );
};

export default Name;
