const CACHE_NAME = 'lem-admin-cache-v1';
const urlsToCache = [
  './admin.html',
  './manifest.json',
  '1.png.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
