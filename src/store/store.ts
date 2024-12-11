import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, State } from '../dataTypes/store-types.ts';
import { createAPI } from '../api/api.ts';
import { NameSpace } from '../dataTypes/enums/name-space.ts';
import { offersSlice } from './offers/offers.slice.ts';
import { userSlice } from './user/user-slice.ts';
import { currentOfferSlice } from './current-offer/current-offer.slice.ts';

export const api = createAPI();

const reducer = combineReducers({
  [NameSpace.Offers]: offersSlice.reducer,
  [NameSpace.CurrentOffer]: currentOfferSlice.reducer,
  [NameSpace.User]: userSlice.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
      serializableCheck: false,
    }),
});

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
