'use client';

import Header from '@/components/Header/Header';
import Navbar from '@/components/Navbar';
import { usePathname } from 'next/navigation';
import { GlobalStyles } from './globalStyles';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const hideNavbarPaths = ['/map', '/add-con', '/view-con', '/trash'];
  const shouldHideNavbar = hideNavbarPaths.some((path) =>
    pathname.startsWith(path)
  );

  return (
    // <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>YogiCon</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Caprasimo&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <GlobalStyles />
        <Header />
        <div>{children}</div>
        {!shouldHideNavbar && <Navbar />}
      </body>
    </html>
  );
};

export default RootLayout;
