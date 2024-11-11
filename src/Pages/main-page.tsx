import React, { useState } from 'react';
import { Offer } from '../dataTypes/offer.ts';
import { OffersList } from '../components/offer/offers-list.tsx';
import { Layout } from '../components/layout.tsx';
import { Helmet } from 'react-helmet-async';
import { Nullable } from 'vitest';
import { Map } from '../components/map/map.tsx';
import { useAppSelector } from '../store/store.ts';
import { CitiesList } from '../components/cities-list.tsx';
import { pluralizeAndCombine } from '../utils/string-utils.ts';

export function MainPage(): React.JSX.Element {
  const [activeOffer, setActiveOffer] = useState<Nullable<Offer>>(null);
  const city = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers).filter(
    (offer) => offer.city.name === city.name,
  );

  return (
    <div className="page page--gray page--main">
      <Layout showFooter>
        <main className="page__main page__main--index">
          <Helmet>6 cities</Helmet>
          <h1 className="visually-hidden">Cities</h1>
          <CitiesList activeCityName={city.name} />
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {pluralizeAndCombine('place', offers.length)} to stay in{' '}
                  {city.name}
                </b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex={0}>
                    Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li
                      className="places__option places__option--active"
                      tabIndex={0}
                    >
                      Popular
                    </li>
                    <li className="places__option" tabIndex={0}>
                      Price: low to high
                    </li>
                    <li className="places__option" tabIndex={0}>
                      Price: high to low
                    </li>
                    <li className="places__option" tabIndex={0}>
                      Top rated first
                    </li>
                  </ul>
                </form>
                <OffersList
                  offers={offers}
                  onActiveOfferChange={(offer: Nullable<Offer>) =>
                    setActiveOffer(offer)}
                  isOnMainPage
                />
              </section>
              <div className="cities__right-section">
                <Map
                  city={city}
                  points={offers.map((x) => ({
                    location: x.location,
                    id: x.id,
                  }))}
                  selectedPoint={
                    activeOffer
                      ? {
                        location: activeOffer?.location,
                        id: activeOffer?.id,
                      }
                      : undefined
                  }
                  isOnMainPage
                />
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </div>
  );
}
