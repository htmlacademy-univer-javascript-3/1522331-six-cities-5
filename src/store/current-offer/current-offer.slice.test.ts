import { ReviewStatus } from '../../dataTypes/enums/review-status.ts';
import {
  currentOfferSlice,
  setCurrentOffer,
  setCurrentReviews,
  setNearbyOffers,
  setReviewPostingStatus,
} from './current-offer.slice.ts';
import { getMockDetailedOffer } from '../../mocks/mock-detailed-offer.ts';
import { describe, expect, it } from 'vitest';
import { getMockOffers } from '../../mocks/mock-offers.ts';
import { getMockReviews } from '../../mocks/mock-review.ts';

describe('current offer slice tests', () => {
  const initialState = {
    currentOffer: null,
    nearbyOffers: [],
    currentReviews: [],
    reviewPostingStatus: ReviewStatus.Success,
  };
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = currentOfferSlice.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = currentOfferSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should set currentOffer', () => {
    const detailedOffer = getMockDetailedOffer();

    const newState = currentOfferSlice.reducer(
      initialState,
      setCurrentOffer(detailedOffer),
    );

    expect(newState.currentOffer).toEqual(detailedOffer);
  });

  it('should set nearbyOffers', () => {
    const nearbyOffers = getMockOffers(2);

    const newState = currentOfferSlice.reducer(
      initialState,
      setNearbyOffers(nearbyOffers),
    );

    expect(newState.nearbyOffers).toEqual(nearbyOffers);
  });

  it('should set currentReviews', () => {
    const reviews = getMockReviews(3);

    const newState = currentOfferSlice.reducer(
      initialState,
      setCurrentReviews(reviews),
    );

    expect(newState.currentReviews).toEqual(reviews);
  });

  it('should set reviewPostingStatus', () => {
    const status = ReviewStatus.Success;

    const newState = currentOfferSlice.reducer(
      initialState,
      setReviewPostingStatus(status),
    );

    expect(newState.reviewPostingStatus).toEqual(status);
  });
});
