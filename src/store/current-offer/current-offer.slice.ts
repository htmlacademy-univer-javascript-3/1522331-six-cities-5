import { Offer } from '../../dataTypes/offer.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpaces } from '../../dataTypes/enums/name-spaces.ts';
import { Nullable } from 'vitest';
import { Review } from '../../dataTypes/review.ts';
import { DetailedOffer } from '../../dataTypes/detailed-offer.ts';
import { ReviewStatus } from '../../dataTypes/enums/review-status.ts';

type CurrentOfferInitialState = {
  currentOffer: Nullable<DetailedOffer>;
  nearbyOffers: Offer[];
  currentReviews: Review[];
  reviewPostingStatus: ReviewStatus;
};

const initialState: CurrentOfferInitialState = {
  currentOffer: null,
  nearbyOffers: [],
  currentReviews: [],
  reviewPostingStatus: ReviewStatus.Success,
};

export const currentOfferSlice = createSlice({
  name: NameSpaces.CurrentOffer,
  initialState,
  reducers: {
    setCurrentOffer: (
      state,
      action: PayloadAction<Nullable<DetailedOffer>>,
    ) => {
      state.currentOffer = action?.payload;
    },
    setNearbyOffers: (state, action: PayloadAction<Offer[]>) => {
      state.nearbyOffers = action.payload;
    },
    setCurrentReviews: (state, action: PayloadAction<Review[]>) => {
      state.currentReviews = action.payload;
    },
    setReviewPostingStatus: (state, action: PayloadAction<ReviewStatus>) => {
      state.reviewPostingStatus = action.payload;
    },
  },
});

export const {
  setCurrentOffer,
  setNearbyOffers,
  setCurrentReviews,
  setReviewPostingStatus,
} = currentOfferSlice.actions;
