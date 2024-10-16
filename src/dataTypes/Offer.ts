import { Location } from './Location.ts';
import { City } from './City.ts';
import { RoomType } from './enums/RoomType.ts';

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
