import { Helmet } from 'react-helmet-async';
import { Layout } from '../components/Layout.tsx';
import { OfferGroup } from '../components/offer/OfferGroup.tsx';
import { Offer } from '../dataTypes/Offer.ts';

interface FavoritesPageProps {
  offers: Offer[];
}

export function FavoritesPage({
  offers,
}: FavoritesPageProps): React.JSX.Element {
  return (
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
  );
}
