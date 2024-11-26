import { configureStore, createReducer } from '@reduxjs/toolkit';
import {
  changeCity,
  setCurrentOffer,
  setNearbyOffers,
  setOffers,
  setSorting,
} from './actions.ts';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, State } from '../dataTypes/store-types.ts';
import { PARIS } from '../consts/cities.ts';
import { Offer } from '../dataTypes/offer.ts';
import { createAPI } from '../api/api.ts';
import { City } from '../dataTypes/city.ts';
import { SortOffers } from '../dataTypes/sort-offers.ts';
import { Nullable } from 'vitest';
import { DetailedOffer } from '../dataTypes/detailed-offer.ts';

type InitialState = {
  city: City;
  offers: Offer[];
  sorting: SortOffers;
  currentOffer: Nullable<DetailedOffer>;
  nearbyOffers: Offer[];
};

const initialState: InitialState = {
  city: PARIS,
  offers: [],
  sorting: (offers: Offer[]) => offers,
  currentOffer: null,
  nearbyOffers: [],
};

export const api = createAPI();

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setSorting, (state, action) => {
      state.sorting = action.payload;
    })
    .addCase(setCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(setNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    });
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
