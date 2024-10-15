import { MainPage } from '../Pages/MainPage.tsx';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../Pages/LoginPage.tsx';
import { FavoritesPage } from '../Pages/FavoritesPage.tsx';
import { OfferPage } from '../Pages/OfferPage.tsx';
import { NotFoundPage } from '../Pages/NotFoundPage/NotFoundPage.tsx';
import { AuthorizationWrapper } from './AuthorizationWrapper.tsx';
import { AppRoutes } from '../DataTypes/AppRoutes.ts';
import { HelmetProvider } from 'react-helmet-async';

interface AppProps {
  placeCount: number;
}

export function App({ placeCount }: AppProps): React.JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoutes.MainPage}
            element={<MainPage placeCount={placeCount} />}
          />
          <Route path={AppRoutes.Login} element={<LoginPage />} />
          <Route
            path={AppRoutes.Favorites}
            element={
              <AuthorizationWrapper isAuthorized={false}>
                <FavoritesPage />
              </AuthorizationWrapper>
            }
          />
          <Route path={AppRoutes.Offer} element={<OfferPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
