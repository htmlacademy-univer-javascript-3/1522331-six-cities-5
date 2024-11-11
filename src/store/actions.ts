import { createAction } from '@reduxjs/toolkit';
import { City } from '../dataTypes/city.ts';
import { Offer } from '../dataTypes/offer.ts';

export const changeCity = createAction<City>('mainPage/changeCity');

export const fillOffers = createAction<Offer[]>('mainPage/fillOffers');
