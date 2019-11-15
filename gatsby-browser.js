const firebase = require('firebase/app');
require('firebase/analytics');
require('firebase/performance');

require('prismjs/themes/prism-solarizedlight.css');

export const onClientEntry = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyC5vsB3ECXxMcLSTiaEhmYKkke0z8XEE0s',
    authDomain: 'portfolio-ebiken.firebaseapp.com',
    databaseURL: 'https://portfolio-ebiken.firebaseio.com',
    projectId: 'portfolio-ebiken',
    storageBucket: 'portfolio-ebiken.appspot.com',
    messagingSenderId: '476117283723',
    appId: '1:476117283723:web:bead1f98dc0b97585b758e',
    measurementId: 'G-5NNVVXSKGF',
  };
  firebase.initializeApp(firebaseConfig);
  firebase.performance();
};

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `This application has been updated. ` +
      `Reload to display the latest version?`
  );
  if (answer === true) {
    window.location.reload();
  }
};
