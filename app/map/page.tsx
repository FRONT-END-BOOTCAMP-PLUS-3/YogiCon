'use client';

import { useState } from 'react';
import styled from 'styled-components';
import ReactKakaoMap from '@/app/map/components/KakaoMap';
import { MdMyLocation } from 'react-icons/md';
import BottomSheet from './components/BottomSheet';

/* ---------------------------------- style --------------------------------- */
const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 30px);
  overflow-y: hidden;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
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

  return (
    <Wrapper>
      <MapContainer>
        <ReactKakaoMap />
        <MyLocation>
          <MdMyLocation />
        </MyLocation>
        <BottomSheet
          selectedItemKey={selectedItemKey}
          setSelectedItemKey={setSelectedItemKey}
        />
      </MapContainer>
    </Wrapper>
  );
}
