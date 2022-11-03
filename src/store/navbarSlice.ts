import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

export const navbarSlice = createSlice({
  name: 'navbar',
  initialState: 'Profile',
  reducers: {
    updateNavbar: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateNavbar } = navbarSlice.actions;

export const selectNavBar = (state: RootState) => state.navbar;

export default navbarSlice.reducer;
