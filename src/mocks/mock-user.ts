import * as faker from 'faker';
import { AuthInfo, User } from '../dataTypes/user.ts';

export function getMockUser(): User {
  return {
    name: faker.name.findName(),
    avatarUrl: faker.image.avatar(),
    isPro: faker.datatype.boolean(),
  };
}

export function getMockAuthInfo(): AuthInfo {
  return {
    name: faker.name.findName(),
    avatarUrl: faker.image.avatar(),
    isPro: faker.datatype.boolean(),
    email: faker.internet.email(),
    token: faker.random.alphaNumeric(16),
  };
}
