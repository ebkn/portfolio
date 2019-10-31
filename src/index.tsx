import * as preact from 'preact'; // eslint-disable-line import/no-duplicates
import { h } from 'preact'; // eslint-disable-line import/no-duplicates
import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/performance';
import 'normalize.css';
import App from './app';

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

/** @jsx h */
/* eslint-disable-next-line */
preact.render(<App />, document.getElementById('root') as HTMLElement);
