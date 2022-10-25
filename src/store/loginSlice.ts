import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isFetching: false,
    currentAccessToken: '',
    isRemember: false,
    isLoggedIn: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.currentAccessToken = action.payload;
      state.isLoggedIn = true;
      state.error = false;
    },
    loginFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    rememberOnSubmit: (state, action: PayloadAction<boolean>) => {
      state.isRemember = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailed, rememberOnSubmit } =
  loginSlice.actions;

export const selectCurrentAccesToken = (state: RootState) =>
  state.login.currentAccessToken;

export const selectIsRemember = (state: RootState) => state.login.isRemember;
export const selectisLoggedIn = (state: RootState) => state.login.isLoggedIn;

export default loginSlice.reducer;
