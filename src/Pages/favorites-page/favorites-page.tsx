import { Helmet } from 'react-helmet-async';
import { Layout } from '../../components/Layout/layout.tsx';
import { FavoritesSection } from '../../components/favorites-section.tsx';
import { useAppSelector } from '../../store/store.ts';
import { getFavoritesOffers } from '../../store/offers/offers.selectors.ts';

export function FavoritesPage(): React.JSX.Element {
  const offers = useAppSelector(getFavoritesOffers);
  return (
    <div
      className={`page ${offers.length === 0 ? 'page--favorites-empty' : ''}`}
    >
      <Helmet>
        <title>6 cities - favorites</title>
      </Helmet>
      <Layout showFooter>
        {offers.length > 0 ? (
          <main className="page__main page__main--favorites">
            <div className="page__favorites-container container">
              <FavoritesSection offers={offers} />
            </div>
          </main>
        ) : (
          <main className="page__main page__main--favorites page__main--favorites-empty">
            <div className="page__favorites-container container">
              <section className="favorites favorites--empty">
                <h1 className="visually-hidden">Favorites (empty)</h1>
                <div className="favorites__status-wrapper">
                  <b className="favorites__status">Nothing yet saved.</b>
                  <p className="favorites__status-description">
                    Save properties to narrow down search or plan your future
                    trips.
                  </p>
                </div>
              </section>
            </div>
          </main>
        )}
      </Layout>
    </div>
  );
}
