importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');
if (workbox) {
  workbox.googleAnalytics.initialize();
} else {
  console.log('failed to load workbox');
}
