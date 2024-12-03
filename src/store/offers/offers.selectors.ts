import { State } from '../../dataTypes/store-types.ts';
import { NameSpaces } from '../../dataTypes/enums/name-spaces.ts';
import { createSelector } from '@reduxjs/toolkit';
import { Offer } from '../../dataTypes/offer.ts';
import { City } from '../../dataTypes/city.ts';
import { SortOffers } from '../../dataTypes/sort-offers.ts';

export const getFavoritesOffers = (state: State) =>
  state[NameSpaces.Offers].favoritesOffers;
export const getCity = (state: State) => state[NameSpaces.Offers].city;
export const getSortedOffers = createSelector(
  [
    (state: State) => state[NameSpaces.Offers].offers,
    (state: State) => state[NameSpaces.Offers].city,
    (state: State) => state[NameSpaces.Offers].sorting,
  ],
  (offers: Offer[], city: City, sort: SortOffers) =>
    sort(offers.filter((offer: Offer) => offer.city.name === city.name)),
);
