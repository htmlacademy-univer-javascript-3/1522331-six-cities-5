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

interface AppProps {
  offers: Offer[];
}

export function App({ offers }: AppProps): React.JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoutes.MainPage}
            element={<MainPage offers={offers} />}
          />
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
  );
}
