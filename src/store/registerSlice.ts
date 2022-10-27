import { createSlice } from '@reduxjs/toolkit';

export const registerSlice = createSlice({
  name: 'register',
  initialState: {
    isFetching: false,
    error: false,
    success: false,
  },
  reducers: {
    registerStart: (state) => {
      state.isFetching = false;
    },
    registerSuccess: (state) => {
      state.isFetching = false;
      state.error = false;
      state.success = true;
    },
    registerFailed: (state) => {
      state.isFetching = false;
      state.error = true;
      state.success = false;
    },
  },
});

export const { registerStart, registerSuccess, registerFailed } =
  registerSlice.actions;

export default registerSlice.reducer;
