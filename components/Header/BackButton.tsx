'use client';

import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import styled from 'styled-components';

/* ---------------------------------- style --------------------------------- */
const StyledBackButton = styled.button`
  display: flex;
  align-items: center;
  position: absolute;
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: var(--deepgray);
  border: 0;
  background-color: transparent;
`;

/* ---------------------------------- type ---------------------------------- */
type BackButtonProps = {
  route?: string;
};

/* -------------------------------- component ------------------------------- */
const BackButton: React.FC<BackButtonProps> = ({ route }) => {
  const router = useRouter();

  const handleBackbutton = () => {
    if (route) {
      router.push(route);
    } else if (window.history.length > 1) {
      router.back();
    }
  };
  return (
    <StyledBackButton type="button">
      <FaArrowLeft onClick={handleBackbutton} />
    </StyledBackButton>
  );
};

export default BackButton;
