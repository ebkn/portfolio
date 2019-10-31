import * as preact from 'preact';
import { h } from 'preact';
import 'normalize.css';
import App from './app';

/* @jsx h */
/* eslint-disable-next-line */
preact.render(<App />, document.getElementById('root') as HTMLElement);
