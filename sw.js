const CACHE_NAME = 'my-game-cache-v1';
const assetsToCache = [
  './',
  './index.html',
  './style.css',
  './game.js'
  // Add any images, sounds, or other scripts here too!
];

// 1. Install Event: Cache all assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache and caching game assets');
      return cache.addAll(assetsToCache);
    })
  );
  self.skipWaiting(); // Force the waiting service worker to become active
});

// 2. Activate Event: Claim clients immediately
self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

// 3. Fetch Event: Serve from cache, fallback to network
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
