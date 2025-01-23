'use client';

import { useRouter } from 'next/navigation';
import { FaArrowLeft } from "react-icons/fa";
import styled from 'styled-components';

const StyledBackButton = styled.button`
 position: absolute;
 margin: 7px;
 border: 0;
 background-color: transparent;
`;
 type BackButtonProps = {
    route?: string;
 }

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
        <StyledBackButton>
            <FaArrowLeft onClick={handleBackbutton} />
        </StyledBackButton>
    );
};

export default BackButton;

