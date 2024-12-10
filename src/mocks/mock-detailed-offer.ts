import * as faker from 'faker';
import { getMockCity, getMockLocation } from './mock-offers.ts';
import { DetailedOffer } from '../dataTypes/detailed-offer.ts';
import { RoomType } from '../dataTypes/enums/room-type.ts';

export function getMockDetailedOffer(): DetailedOffer {
  return {
    id: faker.datatype.uuid(),
    title: faker.commerce.productName(),
    type: RoomType.Hotel,
    price: faker.datatype.number({ min: 100, max: 500 }),
    city: getMockCity(),
    location: getMockLocation(),
    isFavorite: faker.datatype.boolean(),
    isPremium: faker.datatype.boolean(),
    rating: faker.datatype.number({ min: 1, max: 5, precision: 0.1 }),
    description: faker.lorem.paragraph(),
    bedrooms: faker.datatype.number({ min: 1, max: 5 }),
    goods: [
      faker.commerce.product(),
      faker.commerce.product(),
      faker.commerce.product(),
    ],
    host: {
      name: faker.name.findName(),
      avatarUrl: faker.image.avatar(),
      isPro: faker.datatype.boolean(),
    },
    images: [
      faker.image.imageUrl(),
      faker.image.imageUrl(),
      faker.image.imageUrl(),
    ],
    maxAdults: faker.datatype.number({ min: 1, max: 10 }),
  };
}
