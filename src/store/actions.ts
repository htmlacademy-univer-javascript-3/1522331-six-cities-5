import { createAction } from '@reduxjs/toolkit';
import { City } from '../dataTypes/city.ts';
import { Offer } from '../dataTypes/offer.ts';
import { SortOffers } from '../dataTypes/sort-offers.ts';

export const changeCity = createAction<City>('offers/changeCity');

export const setOffers = createAction<Offer[]>('offers/setOffers');

export const setSorting = createAction<SortOffers>('offers/setSorting');
