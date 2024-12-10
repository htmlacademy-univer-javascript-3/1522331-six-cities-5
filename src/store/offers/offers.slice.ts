import { PARIS } from '../../consts/cities.ts';
import { Offer } from '../../dataTypes/offer.ts';
import { City } from '../../dataTypes/city.ts';
import { SortOffers } from '../../dataTypes/sort-offers.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../dataTypes/enums/name-space.ts';
type OffersInitialState = {
  city: City;
  offers: Offer[];
  sorting: SortOffers;
  favoritesOffers: Offer[];
};

const initialState: OffersInitialState = {
  city: PARIS,
  offers: [],
  sorting: (offers: Offer[]) => offers,
  favoritesOffers: [],
};

export const offersSlice = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    setOffers: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    },
    setSorting: (state, action: PayloadAction<SortOffers>) => {
      state.sorting = action.payload;
    },
    setFavoriteOffers: (state, action: PayloadAction<Offer[]>) => {
      state.favoritesOffers = action.payload;
    },
  },
});

export const { changeCity, setOffers, setSorting, setFavoriteOffers } =
  offersSlice.actions;
