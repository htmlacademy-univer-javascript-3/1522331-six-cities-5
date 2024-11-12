import React from 'react';
import { CITIES } from '../consts/cities.ts';
import { City } from '../dataTypes/city.ts';
import { useAppDispatch } from '../store/store.ts';
import { changeCity } from '../store/actions.ts';

interface CitiesListProps {
  activeCityName: string;
}

export function CitiesList({
  activeCityName,
}: CitiesListProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map((city: City) => (
            <li key={city.name} className="locations__item">
              {city.name === activeCityName ? (
                <a className="locations__item-link tabs__item tabs__item--active">
                  <span>{city.name}</span>
                </a>
              ) : (
                <a
                  className="locations__item-link tabs__item"
                  onClick={() => dispatch(changeCity(city))}
                >
                  <span>{city.name}</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
