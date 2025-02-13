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
  const data = JSON.parse(event.data.text());
  clients.openWindow(`${data.link}`); // 링크 처리해줘야함
});

self.addEventListener('install', () => {
  self.skipWaiting();
});
