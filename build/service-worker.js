importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
  workbox.googleAnalytics.initialize();
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
} else {
  console.log('failed to load workbox');
}
