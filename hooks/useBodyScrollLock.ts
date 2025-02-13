import { useEffect } from 'react';

export default function useBodyScrollLock(isOpen: boolean) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.cssText = `
        height: 100vh;
        overflow: hidden;
      `;
    }

    return () => {
      document.body.style.cssText = ``;
    };
  }, [isOpen]);
}
