import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/app.tsx';
import { store } from './store/store.ts';
import {
  checkAuthorization,
  fetchFavoriteOffers,
  fetchOffers,
} from './store/async-actions.ts';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

store.dispatch(fetchOffers());
store.dispatch(fetchFavoriteOffers());
store.dispatch(checkAuthorization());

root.render(
  <React.StrictMode>
    <ToastContainer />
    <App />
  </React.StrictMode>,
);
