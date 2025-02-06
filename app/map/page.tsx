/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import KakaoMap from '@/app/map/components/KakaoMap';
import useGeolocation from '@/hooks/useGeolocation';
import { useRef, useState } from 'react';
import { MdMyLocation } from 'react-icons/md';
import styled from 'styled-components';
import BottomSheet from './components/BottomSheet';

/* ---------------------------------- style --------------------------------- */
const MapContainer = styled.div`
  width: 100%;
  height: calc(100vh - 3.375rem);
  background-color: var(--disabled);
  position: relative;
  z-index: 1;
`;

const MyLocation = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: auto;
  aspect-ratio: 1/1;
  border: none;
  border-radius: 50%;
  background-color: var(--white);
  box-shadow: 2px 2px 5px var(--disabled);
  position: absolute;
  left: 15px;
  bottom: 160px;
  z-index: 1;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

/* ---------------------------------- component --------------------------------- */
export default function Map() {
  const [selectedItemKey, setSelectedItemKey] = useState<string | null>(null);
  const mapRef = useRef<any>(null);
  const { location, error } = useGeolocation();

  const findMyLocation = () => {
    if (error) {
      alert(error); // Geolocation에서 발생한 에러 메시지 표시
      return;
    }
    if (location) {
      console.log('현재 위치:', location.longitude, location.latitude);
      const newCenter = new window.kakao.maps.LatLng(
        location.latitude,
        location.longitude
      );
      mapRef.current.setCenter(newCenter);
    }
  };

  const handleItemClick = (key: string) => {
    if (key !== selectedItemKey) {
      setSelectedItemKey(key);
    }
  };

  return (
    <MapContainer>
      <KakaoMap
        onMapLoad={(map) => (mapRef.current = map)}
        searchKeyword={selectedItemKey}
      />
      <MyLocation type="button" onClick={findMyLocation}>
        <MdMyLocation />
      </MyLocation>
      <BottomSheet
        selectedItemKey={selectedItemKey}
        setSelectedItemKey={handleItemClick}
      />
    </MapContainer>
  );
}
