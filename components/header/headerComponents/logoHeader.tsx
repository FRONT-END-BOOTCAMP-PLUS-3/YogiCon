"use client";

import styled from 'styled-components';
import { usePathname } from 'next/navigation';

// isHome 속성을 Styled Component의 props로 전달
const SubTitle = styled.div<{ $isHome: boolean }>`
    font-weight: 700;
    font-size: 1.5625rem;
    letter-spacing: -0.02rem;
    color: var(--main);
    font-family: ${props => (props.$isHome ? "'Caprasimo', sans-serif" : "sans-serif")};
`;

const LogoHeader = () => {
    const pathname = usePathname();

    // 페이지 경로에 따른 제목
    const headerComponents: { [key: string]: string } = {
        '/': "YOGICON",
        '/mypage': "마이페이지"
    };

    const headerText = headerComponents[pathname] || "YOGICON"; // 기본값 설정
    const isHome = pathname === '/';

    return (
        <div>
            <SubTitle $isHome={isHome}>
                {headerText}
            </SubTitle>
        </div>
    );
}

export default LogoHeader;
