/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import useGeolocation from '@/hooks/useGeolocation';
import { searchShops } from '@/app/user/shop/components/searchShops';
import EventBus from '@/types/EventBus';
import { Location } from '@/types/Location';
import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

type KakaoMapProps = {
  onMapLoad: (map: any, initalLocation: Location) => void;
  searchKeyword: string | null;
  setErrorMessage: (message: string) => void;
};

const KakaoMap = ({
  onMapLoad,
  searchKeyword,
  setErrorMessage,
}: KakaoMapProps) => {
  const apiKey: string | undefined = process.env.NEXT_PUBLIC_KAKAO_KEY;
  const { location } = useGeolocation();
  const [loadedMap, setLoadedMap] = useState<any>(null);
  const [clicked, setClicked] = useState<boolean>(false);
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
          // 현재 위치 마커를 표시하는 함수
          function displayMarker(locPosition: any, message: string) {
            const marker = new window.kakao.maps.Marker({
              map: map,
              position: locPosition,
            });

            const iwContent = message,
              iwRemoveable = true;

            const infowindow = new window.kakao.maps.InfoWindow({
              content: iwContent,
              removable: iwRemoveable,
            });

            infowindow.open(map, marker);
          }
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

          const message = '<div style="padding:5px;">현재위치</div>';
          displayMarker(coords, message);
        });
      }
    });

    return () => {
      document.head.removeChild(script);
    };
  }, [apiKey, location, onMapLoad]);

  useEffect(() => {
    const handleItemClicked = () => setClicked(true);

    EventBus.on('itemClicked', handleItemClicked);

    return () => {
      EventBus.off('itemClicked', handleItemClicked);
    };
  }, []);

  useEffect(() => {
    if (!loadedMap || !searchKeyword) return;

    if (searchKeyword !== prevKeywordRef.current || clicked) {
      console.log('장소 찾을게:', searchKeyword);
      searchShops(loadedMap, searchKeyword, setErrorMessage);
      prevKeywordRef.current = searchKeyword; // 최신 키워드 저장
      setClicked(false); // clicked 리셋
    }
  }, [loadedMap, searchKeyword, clicked]);

  return <div id="map" style={{ height: '100%', width: '100%' }} />;
};

export default KakaoMap;
