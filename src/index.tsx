import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/app.tsx';
import { offerMocks } from './mocks/offers.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App offers={offerMocks} />
  </React.StrictMode>,
);
