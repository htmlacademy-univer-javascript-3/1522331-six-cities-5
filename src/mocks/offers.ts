import { Offer } from '../dataTypes/offer.ts';
import { RoomType } from '../dataTypes/enums/room-type.ts';

export const offerMocks: Offer[] = [
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f00',
    title: 'Beautiful & luxurious studio at great location',
    type: RoomType.Apartment,
    price: 120,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8,
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4,
    previewImage: 'apartment-01.jpg',
  },
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f33',
    title: 'aboba',
    type: RoomType.Room,
    price: 21412,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8,
      },
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 8,
    },
    isFavorite: false,
    isPremium: true,
    rating: 4,
    previewImage: 'apartment-02.jpg',
  },
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f11',
    title: 'Beautiful & luxurious studio at great location',
    type: RoomType.Room,
    price: 14,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8,
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 8,
    },
    isFavorite: true,
    isPremium: false,
    rating: 4,
    previewImage: 'apartment-03.jpg',
  },
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f22',
    title: 'Beautiful & luxurious studio at great location',
    type: RoomType.Apartment,
    price: 88,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8,
      },
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 8,
    },
    isFavorite: true,
    isPremium: true,
    rating: 4,
    previewImage: 'apartment-02.jpg',
  },
];
