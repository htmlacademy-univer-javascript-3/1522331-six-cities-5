import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/app.tsx';
import { store } from './store/store.ts';
import { checkAuthorization, fetchOffers } from './store/actions.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

store.dispatch(fetchOffers());
store.dispatch(checkAuthorization());

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
