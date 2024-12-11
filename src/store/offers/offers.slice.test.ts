import {
  offersSlice,
  changeCity,
  setOffers,
  setSorting,
  setFavoriteOffers,
} from './offers.slice.ts';
import { Offer } from '../../dataTypes/offer.ts';
import { AMSTERDAM, PARIS } from '../../consts/cities.ts';
import { getMockOffers } from '../../mocks/mock-offers.ts';
import { expect, it } from 'vitest';

describe('offers slice test', () => {
  const initialState = {
    city: PARIS,
    offers: [],
    sorting: (offers: Offer[]): Offer[] => offers,
    favoritesOffers: [],
  };
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = offersSlice.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = offersSlice.reducer(undefined, emptyAction);

    expect(result.city.name).toEqual(initialState.city.name);
    expect(result.offers).toEqual([]);
    expect(result.favoritesOffers).toEqual([]);
  });

  it('should change city', () => {
    const newState = offersSlice.reducer(initialState, changeCity(AMSTERDAM));
    expect(newState.city).toEqual(AMSTERDAM);
  });

  it('should set offers', () => {
    const newOffers = getMockOffers(3);
    const newState = offersSlice.reducer(initialState, setOffers(newOffers));
    expect(newState.offers).toEqual(newOffers);
  });

  it('should set sorting function', () => {
    const sortingFunction = (offers: Offer[]) =>
      offers.sort((a, b) => a.price - b.price);
    const newState = offersSlice.reducer(
      initialState,
      setSorting(sortingFunction),
    );
    expect(newState.sorting).toEqual(sortingFunction);
  });

  it('should set favorite offers', () => {
    const favoriteOffers = getMockOffers(3);
    const newState = offersSlice.reducer(
      initialState,
      setFavoriteOffers(favoriteOffers),
    );
    expect(newState.favoritesOffers).toEqual(favoriteOffers);
  });
});
