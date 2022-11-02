import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

export const nabarActionSlice = createSlice({
  name: 'nabarActionSlice',
  initialState: 'Profile',
  reducers: {
    updateNabarAction: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateNabarAction } = nabarActionSlice.actions;

export const selectActionNavBar = (state: RootState) => state.navbarAction;

export default nabarActionSlice.reducer;
