'use client';

import { usePathname } from 'next/navigation';
import BackButtonHeader from './headerComponents/backButtonHeader';
import LogoHeader from './headerComponents/logoHeader';


const Header = () => {
    const pathname = usePathname();
    const backButtonPath = [
        '/map',
        '/trash',
        '/get-giftcon',
        '/giftcon-detail'
    ];

    const logoButtonPath = [
        '/',
        '/mypage'
    ];
    return (
        <div>
            {logoButtonPath.includes(pathname) ? (
                <LogoHeader />
            ) : backButtonPath.includes(pathname) ? (
                <BackButtonHeader />
            ) : (
                <LogoHeader />
            )}
        </div>
    );
};

export default Header;
