import { useEffect } from 'react';

export default function useBodyScrollLock(isOpen: boolean) {
  useEffect(() => {
    if (isOpen) {
      const handleTouchMove = (e: TouchEvent) => {
        e.preventDefault(); // 터치 이동 방지
      };

      document.body.addEventListener('touchmove', handleTouchMove, {
        passive: false,
      });

      return () => {
        document.body.removeEventListener('touchmove', handleTouchMove);
      };
    }
  }, [isOpen]);
}
