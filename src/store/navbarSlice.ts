import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';
import NavbarEnum from 'src/Enum/NavbarEnum';

export const navbarSlice = createSlice({
  name: 'navbar',
  initialState: NavbarEnum.Profile,
  reducers: {
    updateNavbar: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateNavbar } = navbarSlice.actions;

export const selectNavBar = (state: RootState) => state.navbar;

export default navbarSlice.reducer;
