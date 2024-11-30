import { OfferGroup } from './offer/offer-group.tsx';
import { useAppSelector } from '../store/store.ts';

export function FavoritesSection(): React.JSX.Element {
  const offers = useAppSelector((state) => state.favoritesOffers);
  return (
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
      </ul>
    </section>
  );
}
