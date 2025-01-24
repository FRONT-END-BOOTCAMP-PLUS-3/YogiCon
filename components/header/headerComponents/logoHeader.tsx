"use client";

import styled from 'styled-components';
import { usePathname } from 'next/navigation';

const SubTitle = styled.h1<{ $isHome: boolean }>`
    position: fixed;
    font-weight: 700;
    font-size: 1.5625rem;
    letter-spacing: -0.02rem;
    color: var(--main);
    font-family: ${props => (props.$isHome ? "'Caprasimo', sans-serif" : "sans-serif")};
    height: 1.5rem;
`;

const LogoHeader = () => {
    const pathname = usePathname();

    // 페이지 경로에 따른 제목
    const headerComponents: { [key: string]: string } = {
        '/': "YOGICON",
        '/my': "마이페이지"
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
