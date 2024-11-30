import { Offer } from '../../dataTypes/offer.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpaces } from '../../dataTypes/enums/name-spaces.ts';
import { Nullable } from 'vitest';
import { Review } from '../../dataTypes/review.ts';
import { DetailedOffer } from '../../dataTypes/detailed-offer.ts';

type CurrentOfferInitialState = {
  currentOffer: Nullable<DetailedOffer>;
  nearbyOffers: Offer[];
  currentReviews: Review[];
};

const initialState: CurrentOfferInitialState = {
  currentOffer: null,
  nearbyOffers: [],
  currentReviews: [],
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
  },
});

export const { setCurrentOffer, setNearbyOffers, setCurrentReviews } =
  currentOfferSlice.actions;
