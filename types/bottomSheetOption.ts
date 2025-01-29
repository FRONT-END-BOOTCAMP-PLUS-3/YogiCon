'use client';
import { useState, useEffect } from 'react';

// 바텀시트가 최대로 올라갔을 때의 y좌표 값
export const MIN_Y = 100;

// 바텀시트가 최대로 내려갔을 때의 y좌표 값과 높이 값을 가져오는 Hook
export function useBottomSheetDimensions() {
  const [maxY, setMaxY] = useState<number | null>(null);
  const [bottomSheetHeight, setBottomSheetHeight] = useState<number | null>(null);

  useEffect(() => {
    setMaxY(window.innerHeight - 150);
    setBottomSheetHeight(window.innerHeight - MIN_Y);
  }, []);

  return { maxY, bottomSheetHeight };
}