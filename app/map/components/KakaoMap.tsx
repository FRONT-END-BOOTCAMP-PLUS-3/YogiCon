/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import useGeolocation from '@/hooks/useGeolocation';
import { searchPlaces } from '@/hooks/useSearchPlaces';
import eventBus from '@/types/EventBus';

declare global {
  interface Window {
    kakao: any;
  }
}

type ReactKakoMapProps = {
  onMapLoad: (map: any) => void;
  searchKeyword: string | null;
};

const KakaoMap = ({ onMapLoad }: ReactKakoMapProps) => {
  const apiKey: string | undefined = process.env.NEXT_PUBLIC_KAKAO_KEY;
  const { location } = useGeolocation();
  const [loadedMap, setLoadedMap] = useState<any>(null);
  const [searchKeyword, setSearchKeyword] = useState<string | null>(null); // itemClicked 값 저장
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

          onMapLoad(map);
          setLoadedMap(map);

          const message = '<div style="padding:5px;">현재위치</div>';
          displayMarker(coords, message);
        });
      }
    });

    return () => {
      document.head.removeChild(script);
    };
  }, [apiKey, location]);

  // `itemClicked` 이벤트 감지하여 `searchKeyword` 업데이트
  useEffect(() => {
    const handleItemClicked = (key: string) => {
      console.log('카카오맵에서 감지된 키워드:', key);
      setSearchKeyword(key);
      setClicked(true);
    };

    eventBus.on('itemClicked', handleItemClicked);

    return () => {
      eventBus.off('itemClicked', handleItemClicked);
    };
  }, []);

  // `searchKeyword`가 변경될 때마다 `searchPlaces` 실행
  useEffect(() => {
    if ((loadedMap && searchKeyword) || clicked) {
      console.log('장소 찾을게', searchKeyword);
      searchPlaces(loadedMap, searchKeyword);
      setClicked(false);
    }
  }, [loadedMap, searchKeyword, clicked]);

  return <div id="map" style={{ height: '100%', width: '100%' }} />;
};

export default KakaoMap;
