import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

export const loginLogoutSlice = createSlice({
  name: 'loginLogout',
  initialState: {
    login: {
      isFetching: false,
      currentAccessToken: '',
      isRemember: false,
      isLoggedIn: false,
      error: false,
    },
    logout: {
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.login.isFetching = false;
      state.login.currentAccessToken = action.payload;
      state.login.isLoggedIn = true;
      state.login.error = false;
    },
    loginFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    rememberOnSubmit: (state, action: PayloadAction<boolean>) => {
      state.login.isRemember = action.payload;
    },
    logoutStart: (state) => {
      state.logout.isFetching = true;
    },
    logoutSuccess: (state) => {
      state.logout.isFetching = false;
      state.login.currentAccessToken = '';
      state.login.isLoggedIn = false;
      state.logout.error = false;
    },
    logoutFailed: (state) => {
      state.logout.isFetching = false;
      state.logout.error = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  rememberOnSubmit,
  logoutStart,
  logoutSuccess,
  logoutFailed,
} = loginLogoutSlice.actions;

export const selectCurrentAccesToken = (state: RootState) =>
  state.loginLogout.login.currentAccessToken;

export const selectLogin = (state: RootState) => state.loginLogout.login;
export const selectIsRemember = (state: RootState) =>
  state.loginLogout.login.isRemember;
export const selectisLoggedIn = (state: RootState) =>
  state.loginLogout.login.isLoggedIn;

export default loginLogoutSlice.reducer;
