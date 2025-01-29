'use client';

import { useRef, useEffect } from 'react';
import { MIN_Y, useBottomSheetDimensions } from '@/types/bottomSheetOption';

interface BottomSheetMetrics {
  touchStart: {
    sheetY: number;
    touchY: number;
  };
  touchMove: {
    prevTouchY?: number;
    movingDirection: "none" | "down" | "up";
  };
  isContentAreaTouched: boolean;
}

export default function useBottomSheet() {
  const { maxY } = useBottomSheetDimensions()
  const sheet = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const metrics = useRef<BottomSheetMetrics>({
    touchStart: {
      sheetY: 0,
      touchY: 0,
    },
    touchMove: {
      prevTouchY: 0,
      movingDirection: "none",
    },
    isContentAreaTouched: false
  })

  useEffect(() => {
    if (maxY === null || !sheet.current) return;

    const sheetEl = sheet.current;

    // 내부 콘텐츠 스크롤 가능 여부 확인 함수
    const isContentScrollable = () => {
      if (!content.current) return false;
      return content.current.scrollHeight > content.current.clientHeight;
    };

    // 바텀시트가 움직이는 경우를 판별하는 함수
    const canUserMoveBottomSheet = () => {
      const { touchMove, isContentAreaTouched } = metrics.current;

      if (isContentAreaTouched) {
        const contentEl = content.current!;
        const contentScrollTop = contentEl.scrollTop;
        const contentScrollHeight = contentEl.scrollHeight;
        const contentClientHeight = contentEl.clientHeight;

        // 내부 콘텐츠에서 스크롤이 가능하면 바텀시트 이동을 막음
        if (contentScrollTop > 0) return false; // 스크롤이 위로 남아있으면 바텀시트 X
        if (touchMove.movingDirection === "up" && contentScrollTop < contentScrollHeight - contentClientHeight) {
          return false; // 스크롤이 아래로 남아있으면 바텀시트 X
        }
      }
      return sheetEl.getBoundingClientRect().y !== MIN_Y;
    };

    // 터치가 시작될 때 호출되는 함수
    const handleTouchStart = (e: TouchEvent) => {
      if (!sheetEl || !content.current) return;
      const { touchStart } = metrics.current;
      touchStart.sheetY = sheetEl.getBoundingClientRect().y; // 현재 바텀시트의 최상단 모서리의 y좌표값
      touchStart.touchY = e.touches[0].clientY; // 터치한 곳의 y좌표

      metrics.current.isContentAreaTouched = content.current.contains(e.target as Node) && isContentScrollable();
    };

    // 터치를 유지한 채로 드래그할 때 호출되는 함수
    const handleTouchMove = (e: TouchEvent) => {
      if (!sheetEl) return;
      const { touchStart, touchMove } = metrics.current;
      const currentTouch = e.touches[0];

      if (touchMove.prevTouchY === undefined) {
        touchMove.prevTouchY = touchStart.touchY;
      }

      if (touchMove.prevTouchY === 0) {
        touchMove.prevTouchY = touchStart.touchY;
      }

      // 드래그 방향 확인
      const prevY = touchMove.prevTouchY;
      const currentY = currentTouch.clientY;
      touchMove.movingDirection = prevY < currentY ? "down" : "up";

      // 바텀시트 움직임이 가능한 경우에만 preventDefault 호출
      if (canUserMoveBottomSheet()) {
        e.preventDefault();
        const touchOffset = currentY - touchStart.touchY;
        let nextSheetY = touchStart.sheetY + touchOffset;

        if (nextSheetY <= MIN_Y) {
          nextSheetY = MIN_Y;
        }
        if (nextSheetY >= maxY) {
          nextSheetY = maxY;
        }

        sheetEl.style.setProperty('transform', `translate(-50%, ${nextSheetY - maxY}px)`);
      }
    };

    // 드래그가 끝났을 때 사용하는 함수
    const handleTouchEnd = () => {
      if (!sheetEl) return;
      document.body.style.overflowY = 'auto';
      const { touchMove } = metrics.current;

      // content 내부 스크롤이 남아있으면 바텀시트 이동을 막음
      if (metrics.current.isContentAreaTouched && content.current!.scrollTop > 0) {
        return;
      }

      const currentSheetY = sheetEl.getBoundingClientRect().y;

      if (currentSheetY !== MIN_Y) {
        if (touchMove.movingDirection === 'down') {
          sheetEl.style.setProperty('transform', 'translate(-50%, 0)');
        }
        if (touchMove.movingDirection === 'up') {
          sheetEl.style.setProperty('transform', `translate(-50%, ${MIN_Y - maxY}px)`);
        }
      }

      // metrics 초기화
      metrics.current = {
        touchStart: {
          sheetY: 0,
          touchY: 0,
        },
        touchMove: {
          prevTouchY: 0,
          movingDirection: 'none',
        },
        isContentAreaTouched: false, // 초기화
      };
    };

    // 위의 함수들에 이벤트 리스너를 걸어준다
    sheetEl.addEventListener('touchstart', handleTouchStart);
    sheetEl.addEventListener('touchmove', handleTouchMove);
    sheetEl.addEventListener('touchend', handleTouchEnd);

    return () => {
      // sheet.current가 변하더라도, 이벤트를 추가한 원래 DOM 노드(sheetEl)를 사용하여 리스너를 제거
      sheetEl.removeEventListener('touchstart', handleTouchStart);
      sheetEl.removeEventListener('touchmove', handleTouchMove);
      sheetEl.removeEventListener('touchend', handleTouchEnd);
    };
  }, [maxY]);

  return { sheet, content }
}
