'use client';

import { usePathname } from 'next/navigation';
import { JSX } from 'react/jsx-dev-runtime';
import HomeHeader from './headerComponents/homeHeader';
import MapHeader from './headerComponents/mapHeader';
import MyPageHeader from './headerComponents/myPageHeader';
import GetGiftconHeader from './headerComponents/getGiftconHeader';
import GiftconDetailHeader from './headerComponents/giftconDetailHeader';
import TrashHeader from './headerComponents/trashHeader';


const Header = () => {
    const pathname = usePathname();

    const headerComponents: { [key: string]: JSX.Element } = {
        '/home': <HomeHeader />,
        '/map': <MapHeader />,
        '/mypage': <MyPageHeader />,
        '/trash': <TrashHeader />,
        '/get-giftcon': <GetGiftconHeader />,
        '/giftcon-detail': <GiftconDetailHeader />
    };

    return (
        <div>
            {headerComponents[pathname] || <HomeHeader />}
        </div>
    );
};

export default Header;
