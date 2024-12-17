import { MainPage } from '../pages/main-page/main-page.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../pages/login-page/login-page.tsx';
import { FavoritesPage } from '../pages/favorites-page/favorites-page.tsx';
import { OfferPage } from '../pages/offer-page/offer-page.tsx';
import { NotFoundPage } from '../pages/not-found-page/not-found-page.tsx';
import { AppRoute } from '../dataTypes/enums/app-route.ts';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { store } from '../store/store.ts';
import { AuthorizationWrapper } from './authorization-wrapper.tsx';
import { AuthorizationStatus } from '../dataTypes/enums/authorization-status.ts';

export function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            <Route path={AppRoute.MainPage} element={<MainPage />} />
            <Route
              path={AppRoute.Login}
              element={
                <AuthorizationWrapper
                  fallbackUrl={AppRoute.MainPage}
                  requiredStatus={AuthorizationStatus.Unauthorized}
                >
                  <LoginPage />
                </AuthorizationWrapper>
              }
            />
            <Route
              path={AppRoute.Favorites}
              element={
                <AuthorizationWrapper
                  fallbackUrl={AppRoute.Login}
                  requiredStatus={AuthorizationStatus.Authorized}
                >
                  <FavoritesPage />
                </AuthorizationWrapper>
              }
            />
            <Route path={`${AppRoute.Offer}/:id`} element={<OfferPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  );
}
