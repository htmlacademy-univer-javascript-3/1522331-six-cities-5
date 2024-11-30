import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpaces } from '../../dataTypes/enums/name-spaces.ts';
import { AuthorizationStatus } from '../../dataTypes/enums/authorization-status.ts';
import { AuthInfo } from '../../dataTypes/user.ts';

type UserInitialState = {
  authorizationStatus: AuthorizationStatus;
  userInfo: AuthInfo | null;
};

const initialState: UserInitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null,
};

export const userSlice = createSlice({
  name: NameSpaces.User,
  initialState,
  reducers: {
    setAuthorizationStatus: (
      state,
      action: PayloadAction<AuthorizationStatus>,
    ) => {
      state.authorizationStatus = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<AuthInfo>) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setAuthorizationStatus, setUserInfo } = userSlice.actions;
