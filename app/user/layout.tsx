'use client';

import Header from '@/components/Header/Header';
import Navbar from '@/components/Navbar';
import useSubscribePush from '@/hooks/useSubscribePush';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const userId = '3891279432';
  useSubscribePush(userId);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      router.push('/');
    }
  }, [router]);

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
