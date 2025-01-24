'use client';

import { usePathname } from 'next/navigation';
import BackButtonHeader from './headerComponents/BackButtonHeader';
import LogoHeader from './headerComponents/LogoHeader';

const Header = () => {
  const pathname = usePathname();

  const backButtonPath = ['/map', '/trash', '/get-giftcon', '/giftcon-detail'];
  const logoButtonPath = ['/', '/my'];

  return (
    <>
      {logoButtonPath.includes(pathname) ? (
        <LogoHeader />
      ) : backButtonPath.includes(pathname) ? (
        <BackButtonHeader />
      ) : (
        <LogoHeader />
      )}
    </>
  );
};

export default Header;
