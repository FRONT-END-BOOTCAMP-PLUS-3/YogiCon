import { useRouter } from 'next/navigation';
import { CiTrash } from 'react-icons/ci';
import { IoIosLogOut } from 'react-icons/io';
import styled from 'styled-components';
import ModalDialog from '@/components/ModalDialog';
import { useState } from 'react';

interface MyButtonProps {
  id: 'trash' | 'logout' | 'deleteID';
}

/* ---------------------------------- style --------------------------------- */
const Container = styled.div``;

const ButtonWrapper = styled.div<{ id: string }>`
  display: flex;
  height: 3.75rem;
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

const ModalContent = styled.div`
  margin-bottom: 1rem;
`;

/* ---------------------------------- component --------------------------------- */
const MyButton = ({ id }: MyButtonProps) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleConfirm = () => {
    if (id === 'logout') {
      console.log('로그아웃 실행');
      router.push('/login');
    } else if (id === 'deleteID') {
      console.log('회원탈퇴 실행');
      router.push('/');
    }
    closeModal();
  };

  const ButtonConfig = {
    trash: {
      title: '휴지통',
      icon: <StyledTrashCan />,
      onClick: () => router.push('/trash'),
    },
    logout: {
      title: '로그아웃',
      icon: <StyledLogo />,
      onClick: () => {
        openModal();
      },
    },
    deleteID: {
      title: '회원탈퇴',
      icon: null,
      onClick: () => {
        openModal();
      },
    },
  };

  const { title, icon, onClick } = ButtonConfig[id];

  return (
    <Container>
      <ButtonWrapper id={id} onClick={onClick}>
        <span>{title}</span>
        {icon}
      </ButtonWrapper>
      <ModalDialog
        isOpen={isModalOpen}
        buttonCount={2}
        onConfirm={handleConfirm}
        onClose={closeModal}
      >
        <ModalContent>
          {id === 'logout' ? (
            <span>정말 로그아웃 하시겠습니까?</span>
          ) : (
            <span>정말 탈퇴 하시겠습니까?</span>
          )}
        </ModalContent>
      </ModalDialog>
    </Container>
  );
};

export default MyButton;
