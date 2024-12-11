import { getIsAuthorized, getUserInfo } from './user.selectors.ts';
import { NameSpace } from '../../dataTypes/enums/name-space.ts';
import { getMockAuthInfo } from '../../mocks/mock-user.ts';
import { AuthorizationStatus } from '../../dataTypes/enums/authorization-status.ts';

describe('user selectors test', () => {
  const state = {
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Authorized,
      userInfo: getMockAuthInfo(),
    },
  };

  it('should return true if user is authorized', () => {
    const result = getIsAuthorized(state);
    expect(result).toBe(true);
  });

  it('should return user info', () => {
    const result = getUserInfo(state);
    expect(result).toEqual(state[NameSpace.User].userInfo);
  });
});
