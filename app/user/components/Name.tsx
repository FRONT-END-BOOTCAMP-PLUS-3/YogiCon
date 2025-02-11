import { LuUserRound } from 'react-icons/lu';
import styled from 'styled-components';

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
  const getUsername = () => {
    const userInfo = localStorage.getItem('user_info');
    const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;

    const username = parsedUserInfo?.kakao_account?.profile?.nickname;
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
