'use client';

import { usePathname } from 'next/navigation';
import { JSX } from 'react/jsx-dev-runtime';
import BackButtonHeader from './headerComponents/backButtonHeader';
import HomeHeader from './headerComponents/homeHeader';
import MyPageHeader from './headerComponents/myPageHeader';


const Header = () => {
    const pathname = usePathname();
    const backButtonPath = [
        '/map',
        '/trash',
        '/get-giftcon',
        '/giftcon-detail'
    ];

    const headerComponents: { [key: string]: JSX.Element } = {
        '/home': <HomeHeader />,
        '/mypage': <MyPageHeader />
    };

    return (
        <div>
            {headerComponents[pathname] || (backButtonPath.includes(pathname) ? <BackButtonHeader /> : <HomeHeader />)}
        </div>
    );
};

export default Header;
