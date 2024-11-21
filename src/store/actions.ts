import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { City } from '../dataTypes/city.ts';
import { Offer } from '../dataTypes/offer.ts';
import { SortOffers } from '../dataTypes/sort-offers.ts';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../dataTypes/store-types.ts';
import { ApiRoutes } from '../dataTypes/enums/api-routes.ts';
import { DetailedOffer } from '../dataTypes/detailed-offer.ts';
import { Nullable } from 'vitest';
import { AuthorizationStatus } from '../dataTypes/enums/authorization-status.ts';
import { AuthInfo, LoginInfo } from '../dataTypes/user.ts';
import { saveToken } from '../utils/token-utils.ts';

export const changeCity = createAction<City>('offers/changeCity');

export const setOffers = createAction<Offer[]>('offers/setOffers');

export const setCurrentOffer = createAction<Nullable<DetailedOffer>>(
  'offers/setCurrentOffer',
);

export const setAuthorizationStatus = createAction<AuthorizationStatus>(
  'auth/setAuthorizationStatus',
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

export const login = createAsyncThunk<
  void,
  LoginInfo,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('auth/login', async (loginInfo, { dispatch, extra: api }) => {
  const response = await api.post<AuthInfo>(ApiRoutes.Login, loginInfo);
  if (response.status === 200 || response.status === 201) {
    dispatch(setAuthorizationStatus(AuthorizationStatus.Authorized));
    saveToken(response.data.token);
  } else {
    throw response;
  }
});

export const checkAuthorization = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('auth/checkAuthorization', async (_arg, { dispatch, extra: api }) => {
  await api.get(ApiRoutes.Login);
  dispatch(setAuthorizationStatus(AuthorizationStatus.Authorized));
});

export const logout = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('auth/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(ApiRoutes.Logout);
  dispatch(setAuthorizationStatus(AuthorizationStatus.Unauthorized));
});
