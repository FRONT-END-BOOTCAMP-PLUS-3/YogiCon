import { CiTrash } from 'react-icons/ci';
import { IoIosLogOut } from 'react-icons/io';
import styled from 'styled-components';

type MyButtonProps = {
  id: 'trash' | 'logout' | 'deleteID';
  onClick: () => void;
};

/* ---------------------------------- style --------------------------------- */

const StyledButton = styled.button<{ id: string }>`
  display: flex;
  min-height: 3.75rem;
  align-items: center;
  padding-left: 1.69rem;
  justify-content: space-between;
  background-color: var(--white);
  cursor: pointer;
  span {
    font-size: 1.25rem;
    letter-spacing: -0.02rem;
    font-weight: bold;
    color: ${({ id }) => (id === 'deleteID' ? 'var(--main)' : 'inherit')};
  }
`;

const StyledTrashCan = styled(CiTrash)`
  width: 2.125rem;
  height: 2.125rem;
  color: var(--deepgray);
  margin-right: 1.69rem;
`;

const StyledLogo = styled(IoIosLogOut)`
  width: 2.125rem;
  height: 2.125rem;
  color: var(--deepgray);
  margin-right: 1.6rem;
`;

/* ---------------------------------- component --------------------------------- */
const MyButton = ({ id, onClick }: MyButtonProps) => {
  const ButtonConfig = {
    trash: {
      title: '휴지통',
      icon: <StyledTrashCan />,
    },
    logout: {
      title: '로그아웃',
      icon: <StyledLogo />,
    },
    deleteID: {
      title: '회원탈퇴',
      icon: null,
    },
  };

  const { title, icon } = ButtonConfig[id];

  return (
    <StyledButton type="button" id={id} onClick={onClick}>
      <span>{title}</span>
      {icon}
    </StyledButton>
  );
};

export default MyButton;
