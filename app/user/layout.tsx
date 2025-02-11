'use client';

import Header from '@/components/Header/Header';
import Navbar from '@/components/Navbar';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setAccessToken(token);

    if (!token) {
      router.push('/');
    }
  }, []);

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
