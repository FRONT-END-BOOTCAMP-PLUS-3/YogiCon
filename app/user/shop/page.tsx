/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useRef, useState } from 'react';
import { MdMyLocation } from 'react-icons/md';
import styled from 'styled-components';
import BottomSheet from './components/BottomSheet';
import KakaoMap from './components/KakaoMap';

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
  color: var(--deepgray);
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
  const [savedLocation, setSavedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const findMyLocation = () => {
    if (mapRef.current && savedLocation) {
      const newCenter = new window.kakao.maps.LatLng(
        savedLocation.lat,
        savedLocation.lng
      );
      mapRef.current.setCenter(newCenter);
    }
  };

  // const handleMapLoad = (
  //   map: any,
  //   initialLocation: { lat: number; lng: number }
  // ) => {
  //   setMapInstance(map);
  //   setSavedLocation(initialLocation);
  //   console.log(initialLocation);
  // };

  const handleItemClick = (key: string) => {
    setSelectedItemKey(key);
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
      <BottomSheet setSelectedItemKey={handleItemClick} />
    </MapContainer>
  );
}
