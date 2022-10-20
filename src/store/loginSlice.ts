import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isFetching: false,
    currentAccessToken: '',
    isRemember: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.currentAccessToken = action.payload;
      state.error = false;
    },
    loginFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { loginStart, loginSuccess, loginFailed } = loginSlice.actions;

export const selectCurrentAccesToken = (state: RootState) =>
  state.login.currentAccessToken;

export const selectIsRemember = (state: RootState) => state.login.isRemember;

export default loginSlice.reducer;
