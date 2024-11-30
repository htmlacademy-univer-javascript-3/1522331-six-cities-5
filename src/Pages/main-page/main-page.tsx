/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from 'react';
import { Offer } from '../../dataTypes/offer.ts';
import { OffersList } from '../../components/offer/offers-list.tsx';
import { Layout } from '../../components/Layout/layout.tsx';
import { Helmet } from 'react-helmet-async';
import { Nullable } from 'vitest';
import { Map } from '../../components/map/map.tsx';
import { useAppSelector } from '../../store/store.ts';
import { CitiesList } from '../../components/cities-list.tsx';
import { pluralizeAndCombine } from '../../utils/string-utils.ts';
import { OfferSortSelect } from '../../components/offer/offer-sort-select.tsx';
import {
  getCity,
  getSortedOffers,
} from '../../store/offers/offers.selectors.ts';

export function MainPage(): React.JSX.Element {
  const [activeOffer, setActiveOffer] = useState<Nullable<Offer>>(null);
  const city = useAppSelector(getCity);
  const offers = useAppSelector(getSortedOffers);
  const handleActiveOfferChange = useCallback(
    (offer: Nullable<Offer>) => setActiveOffer(offer),
    [],
  );
  const offersCountCaption = `${pluralizeAndCombine('place', offers.length)} to stay in ${city.name}`;
  return (
    <div className="page page--gray page--main">
      <Layout>
        <main className="page__main page__main--index">
          <Helmet>6 cities</Helmet>
          <h1 className="visually-hidden">Cities</h1>
          <CitiesList activeCityName={city.name} />
          {offers.length > 0 ? (
            <div className="cities">
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{offersCountCaption}</b>
                  <OfferSortSelect />
                  <OffersList
                    offers={offers}
                    onActiveOfferChange={handleActiveOfferChange}
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
          ) : (
            <div className="cities">
              <div className="cities__places-container cities__places-container--empty container">
                <section className="cities__no-places">
                  <div className="cities__status-wrapper tabs__content">
                    <b className="cities__status">
                      No places to stay available
                    </b>
                    <p className="cities__status-description">
                      {`We could not find any property available at the moment in
                        ${city.name}`}
                    </p>
                  </div>
                </section>
                <div className="cities__right-section no-offers"></div>
              </div>
            </div>
          )}
        </main>
      </Layout>
    </div>
  );
}
