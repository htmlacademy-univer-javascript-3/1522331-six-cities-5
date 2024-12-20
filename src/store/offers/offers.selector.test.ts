import {
  getFavoritesOffers,
  getCity,
  getSortedOffers,
} from './offers.selectors.ts';
import { NameSpace } from '../../dataTypes/enums/name-space.ts';
import { AMSTERDAM } from '../../consts/cities.ts';
import { Offer } from '../../dataTypes/offer.ts';
import { getMockOffers } from '../../mocks/mock-offers.ts';

describe('offers selectors test', () => {
  const state = {
    [NameSpace.Offers]: {
      city: AMSTERDAM,
      offers: getMockOffers(3),
      sorting: (offers: Offer[]) =>
        offers.sort((a, b) => a.price - b.price),
      favoritesOffers: getMockOffers(4),
    },
  };

  it('should return favorite offers', () => {
    const result = getFavoritesOffers(state);
    expect(result).toEqual(state[NameSpace.Offers].favoritesOffers);
  });

  it('should return city', () => {
    const result = getCity(state);
    expect(result).toEqual(AMSTERDAM);
  });

  it('should return sorted offers for the city', () => {
    const sortedOffers = getSortedOffers(state);
    expect(sortedOffers[0].price).toBeLessThan(sortedOffers[1].price);
    expect(sortedOffers[1].price).toBeLessThan(sortedOffers[2].price);
  });
});
