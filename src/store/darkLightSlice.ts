import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

export const darkLightSlice = createSlice({
  name: 'dark light',
  initialState: false,
  reducers: {
    changeDarkLight: (state) => {
      return !state;
    },
  },
});

export const { changeDarkLight } = darkLightSlice.actions;
export const selectDarkLight = (state: RootState) => state.darkLight;

export default darkLightSlice.reducer;
