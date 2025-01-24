"use client"

import { useRef, useEffect } from 'react';
import { MIN_Y, MAX_Y } from '@/types/bottomSheetOption';

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

    // 바텀시트가 움직이는 경우를 판별하는 함수
    const canUserMoveBottomSheet = () => {
      const { touchMove, isContentAreaTouched } = metrics.current;

      if (isContentAreaTouched) {
        // content가 최상단이 아니면 스크롤 가능
        if (content.current!.scrollTop > 0) {
          return false; // 바텀시트가 움직이지 않음
        }
        // content가 최하단이 아니면 스크롤 가능
        if (
          touchMove.movingDirection === 'up' &&
          content.current!.scrollTop < content.current!.scrollHeight - content.current!.clientHeight
        ) {
          return false; // 바텀시트가 움직이지 않음
        }
      }

      // 바텀시트의 y좌표가 MIN_Y가 아니면 움직일 수 있음
      if (sheet.current!.getBoundingClientRect().y !== MIN_Y) {
        return true;
      }

      return true;
    };


    // 터치가 시작될 때 호출되는 함수
    const handleTouchStart = (e: TouchEvent) => {
      const { touchStart } = metrics.current;
      touchStart.sheetY = sheet.current!.getBoundingClientRect().y; // 현재 바텀시트의 최상단 모서리의 y좌표값
      touchStart.touchY = e.touches[0].clientY; // 터치한 곳의 y좌표
    }

    // 터치를 유지한 채로 드래그할 때 호출되는 함수
    const handleTouchMove = (e: TouchEvent) => {
      const { touchStart, touchMove } = metrics.current;
      const currentTouch = e.touches[0];

      if (touchMove.prevTouchY === undefined) {
        touchMove.prevTouchY = touchStart.touchY;
      }

      if (touchMove.prevTouchY === 0) {
        touchMove.prevTouchY = touchStart.touchY;
      }

      // 드래그 방향 확인
      if (touchMove.prevTouchY < currentTouch.clientY) {
        touchMove.movingDirection = 'down';
      }
      if (touchMove.prevTouchY > currentTouch.clientY) {
        touchMove.movingDirection = 'up';
      }

      // 바텀시트 움직임이 가능한 경우에만 preventDefault 호출
      if (canUserMoveBottomSheet()) {
        e.preventDefault();

        const touchOffset = currentTouch.clientY - touchStart.touchY;
        let nextSheetY = touchStart.sheetY + touchOffset;

        if (nextSheetY <= MIN_Y) {
          nextSheetY = MIN_Y;
        }
        if (nextSheetY >= MAX_Y) {
          nextSheetY = MAX_Y;
        }

        sheet.current!.style.setProperty('transform', `translate(-50%, ${nextSheetY - MAX_Y}px)`);
      }
    };


    // 드래그가 끝났을 때 사용하는 함수
    const handleTouchEnd = (e: TouchEvent) => {
      document.body.style.overflowY = 'auto';
      const { touchMove } = metrics.current;

      const currentSheetY = sheet.current!.getBoundingClientRect().y;

      if (currentSheetY !== MIN_Y) {
        if (touchMove.movingDirection === 'down') {
          sheet.current?.style.setProperty('transform', 'translate(-50%, 0)');
        }
        if (touchMove.movingDirection === 'up') {
          sheet.current!.style.setProperty('transform', `translate(-50%, ${MIN_Y - MAX_Y}px)`);
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
    sheet.current!.addEventListener('touchstart', handleTouchStart);
    sheet.current!.addEventListener('touchmove', handleTouchMove);
    sheet.current!.addEventListener('touchend', handleTouchEnd);
  }, [])


  useEffect(() => {
    const handleTouchStart = () => {
      metrics.current!.isContentAreaTouched = true;
    }
    content.current!.addEventListener('touchstart', handleTouchStart);
  }, []);


  return { sheet, content }
}