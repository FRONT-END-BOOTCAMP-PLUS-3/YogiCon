'use client';

import Header from '@/components/Header/Header';
import Navbar from '@/components/Navbar';
import useSubscribePush from '@/hooks/useSubscribePush';
import { usePathname } from 'next/navigation';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const userId = '3891279432';
  useSubscribePush(userId);
  const pathname = usePathname();

  const hideNavbarPaths = ['/user/gifts/', '/user/shop'];
  const shouldHideNavbar = hideNavbarPaths.some((path) =>
    pathname.startsWith(path)
  );

  return (
    <>
      <Header />
      <div>{children}</div>
      {!shouldHideNavbar && <Navbar />}
    </>
  );
};

export default RootLayout;
