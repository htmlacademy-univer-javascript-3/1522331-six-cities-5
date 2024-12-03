/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from 'react';
import { Offer } from '../../dataTypes/offer.ts';
import { OffersList } from '../../components/offer/offers-list.tsx';
import { Layout } from '../../components/layout/layout.tsx';
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
import { EmptyOffersList } from '../../components/offer/empty-offers-list.tsx';

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
            <EmptyOffersList cityName={city.name} />
          )}
        </main>
      </Layout>
    </div>
  );
}
