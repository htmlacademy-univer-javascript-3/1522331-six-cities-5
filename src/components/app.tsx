import { MainPage } from '../pages/main-page.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../pages/login-page.tsx';
import { FavoritesPage } from '../pages/favorites-page.tsx';
import { OfferPage } from '../pages/offer-page.tsx';
import { NotFoundPage } from '../pages/not-found-page/not-found-page.tsx';
import { AuthorizationWrapper } from './authorization-wrapper.tsx';
import { AppRoutes } from '../dataTypes/enums/app-routes.ts';
import { HelmetProvider } from 'react-helmet-async';
import { Offer } from '../dataTypes/offer.ts';
import { Provider } from 'react-redux';
import { store } from '../store/store.ts';

interface AppProps {
  offers: Offer[];
}

export function App({ offers }: AppProps): React.JSX.Element {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            <Route path={AppRoutes.MainPage} element={<MainPage />} />
            <Route path={AppRoutes.Login} element={<LoginPage />} />
            <Route
              path={AppRoutes.Favorites}
              element={
                <AuthorizationWrapper isAuthorized={false}>
                  <FavoritesPage offers={offers} />
                </AuthorizationWrapper>
              }
            />
            <Route path={`${AppRoutes.Offer}/:id`} element={<OfferPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  );
}
