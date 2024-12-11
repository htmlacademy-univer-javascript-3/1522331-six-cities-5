import { City } from '../dataTypes/city.ts';

export const PARIS: City = {
  name: 'Paris',
  location: {
    latitude: 48.864716,
    longitude: 2.349014,
    zoom: 12,
  },
};

export const COLOGNE: City = {
  name: 'Cologne',
  location: {
    latitude: 50.935173,
    longitude: 6.953101,
    zoom: 12,
  },
};

export const BRUSSELS: City = {
  name: 'Brussels',
  location: {
    latitude: 50.85045,
    longitude: 4.34878,
    zoom: 12,
  },
};

export const AMSTERDAM: City = {
  name: 'Amsterdam',
  location: {
    latitude: 52.377956,
    longitude: 4.89707,
    zoom: 12,
  },
};

export const HAMBURG: City = {
  name: 'Hamburg',
  location: {
    latitude: 53.551086,
    longitude: 9.993682,
    zoom: 12,
  },
};

export const DUSSELDORF: City = {
  name: 'Dusseldorf',
  location: {
    latitude: 51.233334,
    longitude: 6.783333,
    zoom: 12,
  },
};

export const CITIES: City[] = [
  PARIS,
  COLOGNE,
  BRUSSELS,
  AMSTERDAM,
  HAMBURG,
  DUSSELDORF,
] as const;
