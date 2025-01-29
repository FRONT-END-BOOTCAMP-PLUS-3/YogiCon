/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect } from 'react';
import useGeolocation from '@/hooks/useGeolocation';

declare global {
  interface Window {
    kakao: any;
  }
}

const ReactKakaoMap = ({ onMapLoad }: { onMapLoad: (map: any) => void }) => {
  const apiKey: string | undefined = process.env.NEXT_PUBLIC_KAKAO_KEY;
  const { location } = useGeolocation();

  useEffect(() => {
    if (!apiKey || !location) return;

    const script: HTMLScriptElement = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
    document.head.appendChild(script);

    script.addEventListener('load', () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const coords = new window.kakao.maps.LatLng(
          location?.latitude as number,
          location?.longitude as number
        );

        const options = {
          center: coords,
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);
        map.setCenter(coords);
        console.log('셋했다:', coords);
        onMapLoad(map);
      });
    });
  }, [apiKey, location, onMapLoad]);

  return <div id="map" style={{ height: '100%', width: '100%' }} />;
};

export default ReactKakaoMap;
