import { configureStore, createReducer } from '@reduxjs/toolkit';
import {changeCity, setOffers, setSorting} from './actions.ts';
import { offerMocks } from '../mocks/offers.ts';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, State } from '../dataTypes/store-types.ts';
import { PARIS } from '../consts/cities.ts';
import {Offer} from '../dataTypes/offer.ts';

const initialState = {
  city: PARIS,
  offers: offerMocks,
  sorting: (offers: Offer[]) => offers,
};

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
    });
});

export const store = configureStore({ reducer });

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
