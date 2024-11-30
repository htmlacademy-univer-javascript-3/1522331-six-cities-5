import { Helmet } from 'react-helmet-async';
import { Layout } from '../../components/layout.tsx';
import { OffersList } from '../../components/offer/offers-list.tsx';
import { Reviews } from '../../components/reviews/reviews.tsx';
import { Map } from '../../components/map/map.tsx';
import React, { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { OfferInsideItems } from '../../components/offer/offer-inside-items.tsx';
import { OfferHost } from '../../components/offer/offer-host.tsx';
import { capitalize, pluralizeAndCombine } from '../../utils/string-utils.ts';
import { Rating } from '../../components/rating.tsx';
import { OfferGallery } from '../../components/offer/offer-gallery.tsx';
import { BookmarkButton } from '../../components/bookmark-button.tsx';
import { store, useAppSelector } from '../../store/store.ts';
import { setCurrentOffer } from '../../store/actions.ts';
import { Spinner } from '../../components/spinner/Spinner.tsx';
import { AppRoutes } from '../../dataTypes/enums/app-routes.ts';
import {
  fetchNearbyOffers,
  fetchOffer,
  fetchReviews,
} from '../../store/async-actions.ts';

export function OfferPage(): React.JSX.Element {
  const offerId = useParams().id;
  useEffect(() => {
    store.dispatch(setCurrentOffer(null));
    store.dispatch(fetchOffer(offerId!));
    store.dispatch(fetchNearbyOffers(offerId!));
    store.dispatch(fetchReviews(offerId!));
  }, [offerId]);
  const nearbyOffers = useAppSelector((state) => state.nearbyOffers).slice(
    0,
    3,
  );
  const currentOffer = useAppSelector((state) => state.currentOffer);
  const currentReviews = useAppSelector((state) => state.currentReviews);
  if (currentOffer === undefined) {
    return <Navigate to={AppRoutes.NotFoundPage} />;
  }
  return (
    <div className="page">
      <Layout>
        <main className="page__main page__main--offer">
          <Helmet>6 cities - offer</Helmet>
          {!currentOffer ? (
            <Spinner caption={'Loading...'} />
          ) : (
            <>
              <section className="offer">
                <OfferGallery imageSources={currentOffer.images} />
                <div className="offer__container container">
                  <div className="offer__wrapper">
                    {currentOffer.isPremium && (
                      <div className="offer__mark">
                        <span>Premium</span>
                      </div>
                    )}
                    <div className="offer__name-wrapper">
                      <h1 className="offer__name">{currentOffer.title}</h1>
                      <BookmarkButton
                        size="big"
                        isFavorite={currentOffer.isFavorite}
                        usagePlace="offer"
                        offerId={currentOffer.id}
                      />
                    </div>
                    <Rating
                      rating={currentOffer.rating}
                      usePlace="offer"
                      showRatingValue
                    />
                    <ul className="offer__features">
                      <li className="offer__feature offer__feature--entire">
                        {capitalize(currentOffer.type)}
                      </li>
                      <li className="offer__feature offer__feature--bedrooms">
                        {pluralizeAndCombine('bedroom', currentOffer.bedrooms)}
                      </li>
                      <li className="offer__feature offer__feature--adults">
                        Max{' '}
                        {pluralizeAndCombine('adult', currentOffer.maxAdults)}
                      </li>
                    </ul>
                    <div className="offer__price">
                      <b className="offer__price-value">
                        &euro;{currentOffer.price}
                      </b>
                      <span className="offer__price-text">&nbsp;night</span>
                    </div>
                    <OfferInsideItems items={currentOffer.goods} />
                    <div className="offer__host">
                      <OfferHost host={currentOffer.host} />
                      <div className="offer__description">
                        <p className="offer__text">
                          {currentOffer.description}
                        </p>
                      </div>
                    </div>
                    <Reviews reviews={currentReviews} />
                  </div>
                </div>
                <Map
                  city={currentOffer.city}
                  points={[...nearbyOffers, currentOffer].map((x) => ({
                    location: x.location,
                    id: x.id,
                  }))}
                  selectedPoint={{
                    location: currentOffer.location,
                    id: currentOffer.id,
                  }}
                />
              </section>
              <div className="container">
                <section className="near-places places">
                  <h2 className="near-places__title">
                    Other places in the neighbourhood
                  </h2>
                  <div className="near-places__list places__list">
                    {nearbyOffers && <OffersList offers={nearbyOffers} />}
                  </div>
                </section>
              </div>
            </>
          )}
        </main>
      </Layout>
    </div>
  );
}
