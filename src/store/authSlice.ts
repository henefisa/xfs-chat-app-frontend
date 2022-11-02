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
    loginSuccess: (
      state,
      action: PayloadAction<{ access_token: string; refresh_token: string }>
    ) => {
      state.login.isFetching = false;
      state.login.isLoggedIn = true;
      state.login.error = false;
      localStorage.setItem('token', JSON.stringify(action.payload));
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
    logoutSuccess: (state) => {
      state.login.isRemember = false;
      state.login.isLoggedIn = false;
      state.logout.error = false;
      localStorage.removeItem('token');
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

export default authSlice.reducer;
