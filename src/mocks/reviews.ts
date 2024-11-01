import { Review } from '../dataTypes/review.ts';

export const reviewMocks: Review[] = [
  {
    id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a',
    date: '2019-05-08T14:13:56.569Z',
    user: {
      name: 'Oliver Conner',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
    comment:
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 4,
  },
  {
    id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62b',
    date: '2019-05-09T14:16:56.569Z',
    user: {
      name: 'Angelina Conner',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
    comment: 'aboba amogus',
    rating: 5,
  },
];
