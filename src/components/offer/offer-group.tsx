import { Offer } from '../../dataTypes/offer.ts';
import { OffersList } from './offers-list.tsx';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../dataTypes/enums/app-route.ts';
import { useAppDispatch } from '../../store/store.ts';
import { changeCity } from '../../store/offers/offers.slice.ts';
import { CITIES } from '../../consts/cities.ts';

interface OfferGroupProps {
  cityName: string;
  offers: Offer[];
}

export function OfferGroup({
  cityName,
  offers,
}: OfferGroupProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link
            className="locations__item-link"
            onClick={() =>
              dispatch(
                changeCity(CITIES.find((city) => city.name === cityName)!),
              )}
            to={AppRoute.MainPage}
          >
            <span>{cityName}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        <OffersList offers={offers} />
      </div>
    </li>
  );
}
