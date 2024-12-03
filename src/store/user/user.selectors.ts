import { State } from '../../dataTypes/store-types.ts';
import { NameSpaces } from '../../dataTypes/enums/name-spaces.ts';
import { AuthorizationStatus } from '../../dataTypes/enums/authorization-status.ts';

export const getIsAuthorized = (state: State) =>
  state[NameSpaces.User].authorizationStatus === AuthorizationStatus.Authorized;
export const getUserInfo = (state: State) => state[NameSpaces.User].userInfo;
