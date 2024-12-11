import {
  setAuthorizationStatus,
  setUserInfo,
  userSlice,
} from './user-slice.ts';
import { AuthorizationStatus } from '../../dataTypes/enums/authorization-status.ts';
import { getMockAuthInfo } from '../../mocks/mock-user.ts';
import { expect, it } from 'vitest';

describe('user slice test', () => {
  const initialState = {
    authorizationStatus: AuthorizationStatus.Unknown,
    userInfo: null,
  };
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = userSlice.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = userSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should set authorization status', () => {
    const newState = userSlice.reducer(
      initialState,
      setAuthorizationStatus(AuthorizationStatus.Authorized),
    );
    expect(newState.authorizationStatus).toEqual(
      AuthorizationStatus.Authorized,
    );
  });

  it('should set user info', () => {
    const userInfo = getMockAuthInfo();
    const newState = userSlice.reducer(initialState, setUserInfo(userInfo));
    expect(newState.userInfo).toEqual(userInfo);
  });
});
