import { useCallback, useLayoutEffect } from 'react';

export default function useBodyScrollLock(isOpen: boolean) {
  const lockScroll = useCallback(() => {
    document.body.style.cssText = `
    position:fixed;
    top: -${window.scrollY}px;
    left: 50%;
    translate: -50%;
    overflow-y: scroll;
    width: 100%;
    `;
  }, []);

  const openScroll = useCallback(() => {
    const scrollY = document.body.style.top;
    document.body.style.cssText = '';
    window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
  }, []);

  useLayoutEffect(() => {
    if (isOpen) lockScroll();

    return () => {
      openScroll();
    };
  }, [isOpen, lockScroll, openScroll]);
}
