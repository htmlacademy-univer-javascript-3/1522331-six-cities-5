import { State } from '../../dataTypes/store-types.ts';
import { NameSpaces } from '../../dataTypes/enums/name-spaces.ts';
import { MAX_NEARBY_OFFERS } from '../../consts/offers.ts';
import { createSelector } from '@reduxjs/toolkit';
import { Offer } from '../../dataTypes/offer.ts';
import { Review } from '../../dataTypes/review.ts';

export const getCurrentOffer = (state: State) =>
  state[NameSpaces.CurrentOffer].currentOffer;
export const getNearbyOffers = createSelector(
  [(state: State) => state[NameSpaces.CurrentOffer].nearbyOffers],
  (offers: Offer[]) => offers.slice(0, MAX_NEARBY_OFFERS),
);
export const getCurrentReviews = (state: State) =>
  state[NameSpaces.CurrentOffer].currentReviews;

export const getReviewsCount = createSelector(
  [(state: State) => state[NameSpaces.CurrentOffer].currentReviews],
  (reviews: Review[]) => reviews.length,
);
export const getReviewPostingStatus = (state: State) =>
  state[NameSpaces.CurrentOffer].reviewPostingStatus;
