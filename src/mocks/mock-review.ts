import * as faker from 'faker';
import { getMockUser } from './mock-user.ts';
import { Review } from '../dataTypes/review.ts';

export function getMockReview(): Review {
  return {
    id: faker.datatype.uuid(),
    date: faker.date.recent().toDateString(),
    user: getMockUser(),
    comment: faker.lorem.sentence(),
    rating: faker.datatype.number({ min: 1, max: 5 }),
  };
}

export function getMockReviews(count: number): Review[] {
  const reviews = [];
  for (let i = 0; i < count; i++) {
    reviews.push(getMockReview());
  }
  return reviews;
}
