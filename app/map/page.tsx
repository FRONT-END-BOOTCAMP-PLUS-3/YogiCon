/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useRef } from 'react';
import styled from 'styled-components';
import ReactKakaoMap from '@/app/map/components/KakaoMap';
import { MdMyLocation } from 'react-icons/md';
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
  font-size: 1.5rem;
  color: #777777;
  width: 2.5rem;
  aspect-ratio: 1/1;
  border: none;
  border-radius: 50%;
  background-color: white;
  box-shadow: 2px 2px 5px var(--disabled);
  position: absolute;
  left: 15px;
  bottom: 160px;
  z-index: 1;
`;

/* ---------------------------------- component --------------------------------- */
export default function Map() {
  const [selectedItemKey, setSelectedItemKey] = useState<string | null>(null);
  const mapRef = useRef<any>(null);

  const findMyLocation = () => {
    if (!navigator.geolocation) {
      alert('브라우저가 사용자 위치 파악 api를 지원하지 않습니다.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log('현재 위치:', longitude, latitude);

        if (mapRef.current) {
          const newCenter = new window.kakao.maps.LatLng(latitude, longitude);
          mapRef.current.setCenter(newCenter);
        }
      },
      (error) => {
        console.error('Error fetching location:', error);
        alert('위치를 가져오는 데 실패했습니다.');
      }
    );
  };

  return (
    <MapContainer>
      <ReactKakaoMap
        onMapLoad={(map) => (mapRef.current = map)}
        searchKeyword={selectedItemKey}
      />
      <MyLocation type="button" onClick={findMyLocation}>
        <MdMyLocation />
      </MyLocation>
      <BottomSheet
        selectedItemKey={selectedItemKey}
        setSelectedItemKey={setSelectedItemKey}
      />
    </MapContainer>
  );
}
