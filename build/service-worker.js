importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
  workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
  workbox.googleAnalytics.initialize();
  workbox.routing.registerRoute(
    /.js/,
    new workbox.strategies.NetworkFirst(),
  );
  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg|ico)$/,
    new workbox.strategies.CacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ],
    }),
  );
  workbox.routing.registerRoute(
    'https://fonts.googleapis.com/css?family=Source+Code+Pro',
    new workbox.strategies.CacheFirst({
      cacheName: 'font',
    }),
  );
  workbox.routing.registerRoute(
    'https://img.shields.io/badge/status-good-green.svg',
    new workbox.strategies.CacheFirst({
      cacheName: 'good-status-badge',
    }),
  );
} else {
  console.log('failed to load workbox');
}
