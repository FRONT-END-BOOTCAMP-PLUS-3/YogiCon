'use client';

import { useRouter } from 'next/navigation';
import { FaArrowLeft } from "react-icons/fa";
import styled from 'styled-components';

const StyledBackButton = styled.button`
 position: absolute;
 margin: 7px;
 border: 0;
 background-color: transparent;
    svg {
        
        &:hover {
            color: #D9D9D9;
        }
    }
`;


const BackButton = () => {
    const router = useRouter();

    const handleBackbutton = () => {
        try {
            router.back();
            // 에러 발생 시

        }
        catch (error) {
            router.push('/home');
        };
    };
    return (
        <StyledBackButton>
            <FaArrowLeft onClick={handleBackbutton} />
        </StyledBackButton>
    );
};

export default BackButton;

// 예외적인 상황을 대비해서 특정 경로로 보내기 추가