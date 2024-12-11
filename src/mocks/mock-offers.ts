import * as faker from 'faker';
import { Location } from '../dataTypes/location.ts';
import { RoomType } from '../dataTypes/enums/room-type.ts';
import { City } from '../dataTypes/city.ts';
import { Offer } from '../dataTypes/offer.ts';

export function getMockLocation(): Location {
  return {
    latitude: Math.random() * 10 + 50,
    longitude: Math.random() + 4,
    zoom: faker.datatype.number({ min: 8, max: 15 }),
  };
}

export function getMockCity(): City {
  return {
    name: 'Amsterdam',
    location: getMockLocation(),
  };
}

export function getMockOffers(count: number): Offer[] {
  const list = [];

  for (let i = 0; i < count; i++) {
    const offer = {
      id: faker.datatype.uuid(),
      title: faker.commerce.productName(),
      type: RoomType.Apartment,
      price: faker.datatype.number({ min: 100, max: 500 }),
      city: getMockCity(),
      location: getMockLocation(),
      isFavorite: faker.datatype.boolean(),
      isPremium: faker.datatype.boolean(),
      rating: faker.datatype.number({ min: 1, max: 5, precision: 0.1 }),
      previewImage: faker.image.imageUrl(),
    };

    list.push(offer);
  }

  return list;
}
