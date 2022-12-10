import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    login: {
      isFetching: false,
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
      error: false,
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state) => {
      state.login.isFetching = false;
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
      state.register.isFetching = true;
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
    logoutSuccess: (state) => {
      state.login.isRemember = false;
      state.login.isLoggedIn = false;
      state.logout.error = false;
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
    },
    logoutFailed: (state) => {
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
  logoutSuccess,
  logoutFailed,
} = authSlice.actions;

export const selectLoginStore = (state: RootState) => state.auth.login;
export const selectisFetchingLogin = (state: RootState) =>
  state.auth.login.isFetching;

export const selectisFetchingRegister = (state: RootState) =>
  state.auth.register.isFetching;

export default authSlice.reducer;
