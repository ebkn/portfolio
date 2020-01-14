import React from 'react';
import { ModeContextProvider } from './src/context/mode';
import Layout from './src/layout';

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `This application has been updated. ` +
      `Reload to display the latest version?`
  );
  if (answer === true) {
    window.location.reload();
  }
};

export const wrapRootElement = ({ element }) => (
  <ModeContextProvider>{element}</ModeContextProvider>
);
export const wrapPageElement = ({ element }) => (
  <Layout>{element}</Layout>
);
