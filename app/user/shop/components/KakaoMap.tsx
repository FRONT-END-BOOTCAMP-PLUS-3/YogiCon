/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import useGeolocation from '@/hooks/useGeolocation';
import { searchShops } from '@/application/usecases/shop/searchShopsUseCase';
import EventBus from '@/types/EventBus';
import { Location } from '@/types/Location';
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

type KakoMapProps = {
  onMapLoad: (map: any, initalLocation: Location) => void;
  searchKeyword: string | null;
};

const KakaoMap = ({ onMapLoad, searchKeyword }: KakoMapProps) => {
  const apiKey: string | undefined = process.env.NEXT_PUBLIC_KAKAO_KEY;
  const { location } = useGeolocation();
  const [loadedMap, setLoadedMap] = useState<any>(null);
  const [clicked, setClicked] = useState<boolean>(false);

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

  // `searchKeyword`가 변경될 때마다 `searchShops` 실행
  useEffect(() => {
    if ((loadedMap && searchKeyword) || clicked) {
      console.log('장소 찾을게', searchKeyword);
      searchShops(loadedMap, searchKeyword);
      setClicked(false);
    }
  }, [loadedMap, searchKeyword, clicked]);

  return <div id="map" style={{ height: '100%', width: '100%' }} />;
};

export default KakaoMap;
