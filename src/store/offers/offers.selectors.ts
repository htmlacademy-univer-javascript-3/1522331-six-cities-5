import { State } from '../../dataTypes/store-types.ts';
import { NameSpace } from '../../dataTypes/enums/name-space.ts';
import { createSelector } from '@reduxjs/toolkit';
import { Offer } from '../../dataTypes/offer.ts';
import { City } from '../../dataTypes/city.ts';
import { SortOffers } from '../../dataTypes/sort-offers.ts';

type OffersState = Pick<State, NameSpace.Offers>;

export const getFavoritesOffers = (state: OffersState) =>
  state[NameSpace.Offers].favoritesOffers;
export const getCity = (state: OffersState) => state[NameSpace.Offers].city;
export const getSortedOffers = createSelector(
  [
    (state: OffersState) => state[NameSpace.Offers].offers,
    (state: OffersState) => state[NameSpace.Offers].city,
    (state: OffersState) => state[NameSpace.Offers].sorting,
  ],
  (offers: Offer[], city: City, sort: SortOffers) =>
    sort(offers.filter((offer: Offer) => offer.city.name === city.name)),
);
