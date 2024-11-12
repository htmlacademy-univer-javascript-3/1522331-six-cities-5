import { Helmet } from 'react-helmet-async';
import { Layout } from '../../components/layout.tsx';
import { OfferGroup } from '../../components/offer/offer-group.tsx';
import { Offer } from '../../dataTypes/offer.ts';

interface FavoritesPageProps {
  offers: Offer[];
}

export function FavoritesPage({
  offers,
}: FavoritesPageProps): React.JSX.Element {
  return (
    <div className="page">
      <Layout showFooter>
        <main className="page__main page__main--favorites">
          <Helmet>
            <title>6 cities - favorites</title>
          </Helmet>
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Map.groupBy(offers, (o) => o.city.name)
                  .entries()
                  .map(([cityName, offersInCity]) => (
                    <OfferGroup
                      key={cityName}
                      cityName={cityName}
                      offers={offersInCity}
                    />
                  ))
                  .toArray()}
                ;
              </ul>
            </section>
          </div>
        </main>
      </Layout>
    </div>
  );
}
