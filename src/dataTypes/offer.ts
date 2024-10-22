import { Location } from './location.ts';
import { City } from './city.ts';
import { RoomType } from './enums/room-type.ts';

export type Offer = {
  id: string;
  title: string;
  type: RoomType;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};
