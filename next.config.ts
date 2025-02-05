import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true, // SWC를 통한 styled-components 지원 활성화
  },
};

export default nextConfig;
