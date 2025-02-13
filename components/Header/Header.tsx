'use client';

import { usePathname } from 'next/navigation';
import BackButtonHeader from './HeaderComponents/BackButtonHeader';
import LogoHeader from './HeaderComponents/LogoHeader';

const Header = () => {
  const pathname = usePathname();

  const backButtonPath = ['/user/gifts/', '/user/shop'];

  return (
    <>
      {backButtonPath.some((path) => pathname.startsWith(path)) ? (
        <BackButtonHeader pathname={pathname} />
      ) : (
        <LogoHeader pathname={pathname} />
      )}
    </>
  );
};

export default Header;
