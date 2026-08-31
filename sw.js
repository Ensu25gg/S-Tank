self.addEventListener('fetch', function(event) {});
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('my-game-cache').then((cache) => {
      return cache.addAll(['/', '/index.html', '/style.css', '/game.js']);
    })
  );
});
