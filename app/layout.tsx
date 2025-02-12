'use client';

import { useEffect, useState } from 'react';
import { GlobalStyles } from './globalStyles';
import { useRouter } from 'next/navigation';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      router.push('/');
    }
  }, []);
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
        <div>{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
