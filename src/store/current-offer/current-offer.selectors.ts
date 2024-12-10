import { State } from '../../dataTypes/store-types.ts';
import { NameSpace } from '../../dataTypes/enums/name-space.ts';
import { MAX_NEARBY_OFFERS } from '../../consts/offers.ts';
import { createSelector } from '@reduxjs/toolkit';
import { Offer } from '../../dataTypes/offer.ts';
import { Review } from '../../dataTypes/review.ts';

type CurrentOfferState = Pick<State, NameSpace.CurrentOffer>;

export const getCurrentOffer = (state: CurrentOfferState) =>
  state[NameSpace.CurrentOffer].currentOffer;
export const getNearbyOffers = createSelector(
  [(state: CurrentOfferState) => state[NameSpace.CurrentOffer].nearbyOffers],
  (offers: Offer[]) => offers.slice(0, MAX_NEARBY_OFFERS),
);
export const getCurrentReviews = (state: CurrentOfferState) =>
  state[NameSpace.CurrentOffer].currentReviews;

export const getReviewsCount = createSelector(
  [(state: CurrentOfferState) => state[NameSpace.CurrentOffer].currentReviews],
  (reviews: Review[]) => reviews.length,
);
export const getReviewPostingStatus = (state: CurrentOfferState) =>
  state[NameSpace.CurrentOffer].reviewPostingStatus;
