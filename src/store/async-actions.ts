import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../dataTypes/store-types.ts';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { Offer } from '../dataTypes/offer.ts';
import { ApiRoute } from '../dataTypes/enums/api-route.ts';
import { DetailedOffer } from '../dataTypes/detailed-offer.ts';
import { AuthInfo, LoginInfo } from '../dataTypes/user.ts';
import { AuthorizationStatus } from '../dataTypes/enums/authorization-status.ts';
import { dropToken, saveToken } from '../utils/token-utils.ts';
import { Review, ReviewShortInfo } from '../dataTypes/review.ts';
import { setFavoriteOffers, setOffers } from './offers/offers.slice.ts';
import {
  setCurrentOffer,
  setCurrentReviews,
  setNearbyOffers,
  setReviewPostingStatus,
} from './current-offer/current-offer.slice.ts';
import { setAuthorizationStatus, setUserInfo } from './user/user-slice.ts';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReviewStatus } from '../dataTypes/enums/review-status.ts';

export const fetchOffers = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffers', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<Offer[]>(ApiRoute.Offers);
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
  try {
    const { data } = await api.get<DetailedOffer>(`${ApiRoute.Offers}/${id}`);
    dispatch(setCurrentOffer(data));
  } catch (err) {
    const error = err as Error | AxiosError;
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.status === 404
    ) {
      dispatch(setCurrentOffer(undefined));
    }
  }
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
  const { data } = await api.get<Offer[]>(`${ApiRoute.Offers}/${id}/nearby`);
  dispatch(setNearbyOffers(data));
});

export const fetchReviews = createAsyncThunk<
  void,
  Offer['id'],
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('review/fetchReviews', async (offerId, { dispatch, extra: api }) => {
  const { data } = await api.get<Review[]>(`${ApiRoute.Comments}/${offerId}`);
  dispatch(setCurrentReviews(data));
});

export const postReview = createAsyncThunk<
  void,
  ReviewShortInfo,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('review/postReview', async (info, { dispatch, extra: api }) => {
  try {
    const response = await api.post(`${ApiRoute.Comments}/${info.offerId}`, {
      comment: info.comment,
      rating: info.rating,
    });
    if (response.status === 201) {
      dispatch(fetchReviews(info.offerId));
      dispatch(setReviewPostingStatus(ReviewStatus.Success));
    }
  } catch (err) {
    const error = err as Error | AxiosError;
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.status !== 201
    ) {
      toast.error(
        `Error posting review, server responded with status ${error.response.status}. please try again later.`,
      );
    } else {
      toast.error('Error posting comment. please try again later');
    }
    dispatch(setReviewPostingStatus(ReviewStatus.Error));
  }
});

export const fetchFavoriteOffers = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('offers/fetchFavorites', async (_arg, { dispatch, extra: api }) => {
  const response = await api.get<Offer[]>(ApiRoute.Favorites);
  if (response.status === 200) {
    dispatch(setFavoriteOffers(response.data));
  }
});

export const bookmarkOffer = createAsyncThunk<
  void,
  { offerId: string; status: boolean },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('review/fetchReviews', async (info, { dispatch, extra: api }) => {
  const response = await api.post(
    `${ApiRoute.Favorites}/${info.offerId}/${+info.status}`,
  );
  if (response.status === 201 || response.status === 200) {
    dispatch(fetchFavoriteOffers());
  }
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
  try {
    const response = await api.post<AuthInfo>(ApiRoute.Login, loginInfo);
    if (response.status === 200 || response.status === 201) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.Authorized));
      saveToken(response.data.token);
      dispatch(setUserInfo(response.data));
      dispatch(fetchFavoriteOffers());
    }
  } catch (err) {
    const error = err as Error | AxiosError;
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.status === 401
    ) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.Unauthorized));
    }
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
  try {
    const response = await api.get<AuthInfo>(ApiRoute.Login);
    if (response.status === 200 || response.status === 201) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.Authorized));
      dispatch(setUserInfo(response.data));
    }
  } catch (err) {
    const error = err as Error | AxiosError;
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.status === 401
    ) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.Unauthorized));
      dropToken();
    }
  }
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
  await api.delete(ApiRoute.Logout);
  dispatch(setAuthorizationStatus(AuthorizationStatus.Unauthorized));
});
