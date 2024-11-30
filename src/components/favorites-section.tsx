import { OfferGroup } from './offer/offer-group.tsx';
import { Offer } from '../dataTypes/offer.ts';

interface FavoritesSectionProps {
  offers: Offer[];
}

export function FavoritesSection({
  offers,
}: FavoritesSectionProps): React.JSX.Element {
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
