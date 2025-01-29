'use client';

import { useState } from 'react';
import styled from 'styled-components';
import BottomSheet from './components/BottomSheet';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgb(252, 215, 255);
`;

export default function Map() {
  const [selectedItemKey, setSelectedItemKey] = useState<string | null>(null);

  return (
    <Wrapper>
      <div style={{ paddingTop: '100px' }}></div>
      <h1>선택된 아이템의 브랜드: {selectedItemKey ?? '없음'}</h1>
      <BottomSheet
        selectedItemKey={selectedItemKey}
        setSelectedItemKey={setSelectedItemKey}
      />
    </Wrapper>
  );
}
