/* eslint-disable */
self.addEventListener('install', function() {
  console.log('Service Worker install');
});
self.addEventListener('activate', function() {
  console.log('Service Worker Activate');
});
self.addEventListener('fetch', function(event) {});
