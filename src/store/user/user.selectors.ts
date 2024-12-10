import { State } from '../../dataTypes/store-types.ts';
import { NameSpace } from '../../dataTypes/enums/name-space.ts';
import { AuthorizationStatus } from '../../dataTypes/enums/authorization-status.ts';

type UserState = Pick<State, NameSpace.User>;

export const getIsAuthorized = (state: UserState) =>
  state[NameSpace.User].authorizationStatus === AuthorizationStatus.Authorized;
export const getUserInfo = (state: UserState) => state[NameSpace.User].userInfo;
