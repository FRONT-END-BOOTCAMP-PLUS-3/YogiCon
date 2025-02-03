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
        <LogoHeader pathname={pathname} />
      ) : backButtonPath.includes(pathname) ? (
        <BackButtonHeader pathname={pathname} />
      ) : (
        <LogoHeader pathname={pathname} />
      )}
    </>
  );
};

export default Header;
