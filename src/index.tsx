import * as preact from 'preact'; // eslint-disable-line import/no-duplicates
import { h } from 'preact'; // eslint-disable-line import/no-duplicates
import 'normalize.css';
import App from './app';

/** @jsx h */
/* eslint-disable-next-line */
preact.render(<App />, document.getElementById('root') as HTMLElement);
