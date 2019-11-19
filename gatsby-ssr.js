import React from 'react';
import { ModeContextProvider } from './src/context/mode';
import Layout from './src/layout';

export const wrapRootElement = ({ element }) => (
  <ModeContextProvider>{element}</ModeContextProvider>
);
export const wrapPageElement = ({ element }) => (
  <Layout>{element}</Layout>
);
