import { Helmet } from 'react-helmet-async';
import { Layout } from '../components/layout.tsx';
import { OffersList } from '../components/offer/offers-list.tsx';
import { offerMocks } from '../mocks/offers.ts';
import { Reviews } from '../components/reviews/reviews.tsx';
import { reviewMocks } from '../mocks/reviews.ts';
import { Map } from '../components/map/map.tsx';
import React from 'react';
import { useParams } from 'react-router-dom';
import { OfferInsideItems } from '../components/offer/offer-inside-items.tsx';
import { detailedOfferMocks } from '../mocks/detailed-offer.ts';
import { OfferHost } from '../components/offer/offer-host.tsx';
import { capitalize, pluralizeAndCombine } from '../utils/string-utils.ts';
import { Rating } from '../components/rating.tsx';
import { OfferGallery } from '../components/offer/offer-gallery.tsx';
import { BookmarkButton } from '../components/bookmark-button.tsx';

export function OfferPage(): React.JSX.Element {
  const offerId = useParams().id;
  const offers = offerMocks.filter((offer) => offer.id !== offerId).slice(0, 3);
  const currentOffer = detailedOfferMocks.find(
    (offer) => offer.id === offerId,
  )!;
  return (
    <div className="page">
      <Layout>
        <main className="page__main page__main--offer">
          <Helmet>6 cities - offer</Helmet>
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
                  <BookmarkButton size='big' isFavorite={currentOffer.isFavorite} usagePlace='offer' />
                </div>
                <Rating
                  rating={currentOffer.rating}
                  usePlace="offer"
                  isInOffer
                />
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">
                    {capitalize(currentOffer.type)}
                  </li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {pluralizeAndCombine('bedroom', currentOffer.bedrooms)}
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    Max {pluralizeAndCombine('adult', currentOffer.maxAdults)}
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
                      A quiet cozy and picturesque that hides behind a a river
                      by the unique lightness of Amsterdam. The building is
                      green and from 18th century.
                    </p>
                    <p className="offer__text">
                      An independent House, strategically located between
                      Rembrand Square and National Opera, but where the bustle
                      of the city comes to rest in this alley flowery and
                      colorful.
                    </p>
                  </div>
                </div>
                <Reviews reviews={reviewMocks} />
              </div>
            </div>
            <Map
              city={offers[0].city}
              points={[...offers, currentOffer].map((x) => ({
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
                <OffersList offers={offers} />
              </div>
            </section>
          </div>
        </main>
      </Layout>
    </div>
  );
}
