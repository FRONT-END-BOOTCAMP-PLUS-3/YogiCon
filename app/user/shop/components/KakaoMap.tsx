/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { searchShops } from '@/app/user/shop/components/searchShops';
import useGeolocation from '@/hooks/useGeolocation';
import { useStore } from '@/stores/useStore';
import { Location } from '@/types/Location';
import { useEffect, useRef, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import MarkerInfo from './MarkerInfo';

declare global {
  interface Window {
    kakao: any;
  }
}

type KakaoMapProps = {
  onMapLoad: (map: any, initalLocation: Location) => void;
  searchKeyword: string | null;
};

const KakaoMap = ({ onMapLoad, searchKeyword }: KakaoMapProps) => {
  const apiKey: string | undefined = process.env.NEXT_PUBLIC_KAKAO_KEY;
  const { location } = useGeolocation();
  const [loadedMap, setLoadedMap] = useState<any>(null);
  const { itemClicked, setItemClicked } = useStore();
  const prevKeywordRef = useRef<string | null>(null);

  useEffect(() => {
    if (!apiKey || !location) return;

    const script: HTMLScriptElement = document.createElement('script');
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services`;
    document.head.appendChild(script);

    script.addEventListener('load', () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          const container = document.getElementById('map');
          const coords = new window.kakao.maps.LatLng(
            location?.latitude as number,
            location?.longitude as number
          );
          const options = { center: coords, level: 3 };
          const map = new window.kakao.maps.Map(container, options);

          onMapLoad(map, {
            longitude: location.longitude,
            latitude: location.latitude,
          });
          setLoadedMap(map);

          const marker = new window.kakao.maps.Marker({
            map: map,
            position: coords,
          });

          const overlayContent = <MarkerInfo place_name="현재 위치" />;

          const overlayString = ReactDOMServer.renderToString(overlayContent);

          const customOverlay = new window.kakao.maps.CustomOverlay({
            position: coords,
            content: overlayString,
            yAnchor: 2.8, // 높이 지정 (선택)
          });

          marker.setMap(map);
          customOverlay.setMap(map);
        });
      }
    });

    return () => {
      document.head.removeChild(script);
    };
  }, [apiKey, location, onMapLoad]);

  useEffect(() => {
    if (!loadedMap || !searchKeyword) return;

    if (searchKeyword !== prevKeywordRef.current || itemClicked) {
      console.log('장소 찾을게:', searchKeyword);
      searchShops(loadedMap, searchKeyword);
      prevKeywordRef.current = searchKeyword; // 최신 키워드 저장
      setItemClicked(false); // itemClicked 리셋
    }
  }, [itemClicked, loadedMap, searchKeyword, setItemClicked]);

  return <div id="map" style={{ height: '100%', width: '100%' }} />;
};

export default KakaoMap;
