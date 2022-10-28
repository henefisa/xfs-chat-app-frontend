import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    login: {
      isFetching: false,
      currentAccessToken: '',
      isRemember: false,
      isLoggedIn: false,
      error: false,
    },
    register: {
      isFetching: false,
      error: false,
      success: false,
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
    registerStart: (state) => {
      state.register.isFetching = false;
    },
    registerSuccess: (state) => {
      state.register.isFetching = false;
      state.register.error = false;
      state.register.success = true;
    },
    registerFailed: (state) => {
      state.register.isFetching = false;
      state.register.error = true;
      state.register.success = false;
    },
    logoutStart: (state) => {
      state.logout.isFetching = true;
    },
    logoutSuccess: (state) => {
      state.logout.isFetching = false;
      state.login.currentAccessToken = '';
      state.login.isRemember = false;
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
  registerStart,
  registerSuccess,
  registerFailed,
  logoutStart,
  logoutSuccess,
  logoutFailed,
} = authSlice.actions;

export const selectLoginStore = (state: RootState) => state.auth.login;

export default authSlice.reducer;
