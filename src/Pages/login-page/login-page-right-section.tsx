import { Link } from 'react-router-dom';
import { AppRoute } from '../../dataTypes/enums/app-route.ts';
import { changeCity } from '../../store/offers/offers.slice.ts';
import { CITIES } from '../../consts/cities.ts';
import { useAppDispatch } from '../../store/store.ts';
import { memo } from 'react';

function LoginPageRightSectionImpl() {
  const city = CITIES[Math.floor(Math.random() * CITIES.length)];
  const dispatch = useAppDispatch();
  return (
    <section className="locations locations--login locations--current">
      <div className="locations__item">
        <Link
          className="locations__item-link"
          to={AppRoute.MainPage}
          onClick={() => dispatch(changeCity(city))}
        >
          <span>{city.name}</span>
        </Link>
      </div>
    </section>
  );
}

export const LoginPageRightSection = memo(LoginPageRightSectionImpl);
