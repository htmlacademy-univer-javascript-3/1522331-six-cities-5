import { describe } from 'vitest';
import {
  getCurrentOffer,
  getCurrentReviews,
  getNearbyOffers,
  getReviewPostingStatus,
  getReviewsCount,
} from './current-offer.selectors.ts';
import { ReviewStatus } from '../../dataTypes/enums/review-status.ts';
import { getMockDetailedOffer } from '../../mocks/mock-detailed-offer.ts';
import { getMockOffers } from '../../mocks/mock-offers.ts';
import { getMockReviews } from '../../mocks/mock-review.ts';
import { NameSpace } from '../../dataTypes/enums/name-space.ts';

describe('Current offer selectors test', () => {
  const state = {
    [NameSpace.CurrentOffer]: {
      currentOffer: getMockDetailedOffer(),
      nearbyOffers: getMockOffers(3),
      currentReviews: getMockReviews(2),
      reviewPostingStatus: ReviewStatus.Success,
    },
  };
  it('should return current offer', () => {
    const result = getCurrentOffer(state);
    expect(result).toEqual(state[NameSpace.CurrentOffer].currentOffer);
  });

  it('should return nearby offers', () => {
    const result = getNearbyOffers(state);
    expect(result).toEqual(state[NameSpace.CurrentOffer].nearbyOffers);
  });

  it('should return current reviews', () => {
    const result = getCurrentReviews(state);
    expect(result).toEqual(state[NameSpace.CurrentOffer].currentReviews);
  });

  it('should return number of reviews', () => {
    const result = getReviewsCount(state);
    expect(result).toBe(2);
  });

  it('should return review posting status', () => {
    const result = getReviewPostingStatus(state);
    expect(result).toBe(state[NameSpace.CurrentOffer].reviewPostingStatus);
  });
});
