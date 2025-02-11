import { useEffect, useState } from 'react';

export default function useSubscribePush() {
  const [pushSubscription, setPushSubscription] =
    useState<PushSubscription | null>(null);
  useEffect(() => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.warn('푸시 알림을 지원하지 않는 브라우저입니다.');
      alert('푸시 알림을 지원하지 않는 브라우저입니다.');
      return;
    }

    const registerServiceWorker = async () => {
      return await navigator.serviceWorker.register('/service-worker.js');
    };

    const subscribePush = async () => {
      const serviceWorker = await registerServiceWorker();

      const subscription = await serviceWorker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      });

      setPushSubscription(subscription);
    };

    subscribePush();
  }, []);

  return {
    pushSubscription,
    isSubscribed: pushSubscription !== null,
  };
}
