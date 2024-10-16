import { MainPage } from '../Pages/MainPage.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../Pages/LoginPage.tsx';
import { FavoritesPage } from '../Pages/FavoritesPage.tsx';
import { OfferPage } from '../Pages/OfferPage.tsx';
import { NotFoundPage } from '../Pages/NotFoundPage/NotFoundPage.tsx';
import { AuthorizationWrapper } from './AuthorizationWrapper.tsx';
import { AppRoutes } from '../dataTypes/enums/AppRoutes.ts';
import { HelmetProvider } from 'react-helmet-async';
import { Offer } from '../dataTypes/Offer.ts';

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
              <AuthorizationWrapper isAuthorized={true}>
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
