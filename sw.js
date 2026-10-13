// Service Worker - Gastos del Hogar · Familia Guacheta Noguera
const CACHE_NAME = 'gastos-hogar-v2';
const ASSETS = [
  '/gastos-hogar/',
  '/gastos-hogar/index.html',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS).catch(() => {});
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Skip Firebase requests — always network
  if (e.request.url.includes('firestore') ||
      e.request.url.includes('firebase') ||
      e.request.url.includes('gstatic')) {
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached => {
      return cached || fetch(e.request).then(resp => {
        if (resp && resp.status === 200 && resp.type === 'basic') {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        }
        return resp;
      }).catch(() => cached);
    })
  );
});

// Push notifications
self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : { title: 'Gastos del Hogar', body: 'Tienes pagos pendientes' };
  e.waitUntil(
    self.registration.showNotification(data.title || '🏡 Gastos del Hogar', {
      body: data.body || 'Revisa tus gastos del mes',
      icon: '/gastos-hogar/icon-192.png',
      badge: '/gastos-hogar/icon-192.png',
      vibrate: [200, 100, 200],
      data: { url: '/gastos-hogar/' }
    })
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.openWindow(e.notification.data?.url || '/gastos-hogar/')
  );
});
