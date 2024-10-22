import { Offer } from '../../dataTypes/offer.ts';
import { OffersList } from './offers-list.tsx';

interface OfferGroupProps {
  cityName: string;
  offers: Offer[];
}

export function OfferGroup({
  cityName,
  offers,
}: OfferGroupProps): React.JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{cityName}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        <OffersList offers={offers} />
      </div>
    </li>
  );
}
