import { createAction } from '@reduxjs/toolkit';
import { City } from '../dataTypes/city.ts';
import { Offer } from '../dataTypes/offer.ts';
import { SortOffers } from '../dataTypes/sort-offers.ts';
import { DetailedOffer } from '../dataTypes/detailed-offer.ts';
import { Nullable } from 'vitest';
import { AuthorizationStatus } from '../dataTypes/enums/authorization-status.ts';
import { Review } from '../dataTypes/review.ts';
import { AuthInfo } from '../dataTypes/user.ts';

export const changeCity = createAction<City>('offers/changeCity');

export const setOffers = createAction<Offer[]>('offers/setOffers');

export const setCurrentOffer = createAction<Nullable<DetailedOffer>>(
  'offers/setCurrentOffer',
);

export const setFavoriteOffers = createAction<Offer[]>('offers/setFavorites');

export const setSorting = createAction<SortOffers>('offers/setSorting');

export const setNearbyOffers = createAction<Offer[]>('offers/setNearbyOffers');

export const setCurrentReviews = createAction<Review[]>(
  'reviews/setCurrentReviews',
);

export const setAuthorizationStatus = createAction<AuthorizationStatus>(
  'auth/setAuthorizationStatus',
);

export const setUserInfo = createAction<AuthInfo>('auth/setUserInfo');
