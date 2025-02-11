self.addEventListener('push', (event) => {
  const data = JSON.parse(event.data.text());
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/icon512_maskable.png',
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  clients.openWindow('/user/gifts'); // 링크 처리해줘야함
});

self.addEventListener('install', () => {
  self.skipWaiting();
});
