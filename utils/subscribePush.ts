export const subscribePush = async (userId: string) => {
  const registerServiceWorker = async () => {
    return await navigator.serviceWorker.register('/service-worker.js');
  };

  const subscribePush = async () => {
    const serviceWorker = await registerServiceWorker();

    const subscription = await serviceWorker.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    });

    return subscription;
  };

  const subscription = await subscribePush();

  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.warn('푸시 알림을 지원하지 않는 브라우저입니다.');
    alert('푸시 알림을 지원하지 않는 브라우저입니다.');
    return;
  }

  try {
    const response = await fetch(`/api/user/subscription?userId=${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscription),
    });

    if (!response.ok) {
      throw new Error(`서버 오류: ${response.status}`);
    }
  } catch (err) {
    console.error('구독 정보 전송 중 오류 발생:', err);
  }
};
