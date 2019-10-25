import * as preact from 'preact';
import 'normalize.css';
import App from './app';

/** @jsx preact.h */
/* eslint-disable-next-line */
preact.render(<App />, document.getElementById('root') as HTMLElement);
