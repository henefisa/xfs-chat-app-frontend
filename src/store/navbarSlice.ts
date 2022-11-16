import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';
import ENavbar from 'src/interfaces/ENavbar';

export const navbarSlice = createSlice({
  name: 'navbar',
  initialState: ENavbar.PROFILE,
  reducers: {
    updateNavbar: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateNavbar } = navbarSlice.actions;

export const selectNavBar = (state: RootState) => state.navbar;

export default navbarSlice.reducer;
