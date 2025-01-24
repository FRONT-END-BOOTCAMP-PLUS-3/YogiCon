'use client';

import { usePathname } from 'next/navigation';
import BackButtonHeader from './HeaderComponents/BackButtonHeader';
import LogoHeader from './HeaderComponents/LogoHeader';

const Header = () => {
  const pathname = usePathname();

  const backButtonPath = ['/map', '/trash', '/add-con', '/view-con'];
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
