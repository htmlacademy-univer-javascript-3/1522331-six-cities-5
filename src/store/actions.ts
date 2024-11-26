import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { City } from '../dataTypes/city.ts';
import { Offer } from '../dataTypes/offer.ts';
import { SortOffers } from '../dataTypes/sort-offers.ts';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../dataTypes/store-types.ts';
import { ApiRoutes } from '../dataTypes/enums/api-routes.ts';
import { DetailedOffer } from '../dataTypes/detailed-offer.ts';
import { Nullable } from 'vitest';

export const changeCity = createAction<City>('offers/changeCity');

export const setOffers = createAction<Offer[]>('offers/setOffers');

export const setCurrentOffer = createAction<Nullable<DetailedOffer>>(
  'offers/setCurrentOffer',
);

export const setSorting = createAction<SortOffers>('offers/setSorting');

export const setNearbyOffers = createAction<Offer[]>('offers/setNearbyOffers');

export const fetchOffers = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffers', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<Offer[]>(ApiRoutes.Offers);
  dispatch(setOffers(data));
});

export const fetchOffer = createAsyncThunk<
  void,
  Offer['id'],
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffer', async (id, { dispatch, extra: api }) => {
  const { data } = await api.get<DetailedOffer>(`${ApiRoutes.Offers}/${id}`);
  dispatch(setCurrentOffer(data));
});

export const fetchNearbyOffers = createAsyncThunk<
  void,
  Offer['id'],
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchNearbyOffers', async (id, { dispatch, extra: api }) => {
  const { data } = await api.get<Offer[]>(`${ApiRoutes.Offers}/${id}/nearby`);
  dispatch(setNearbyOffers(data));
});
