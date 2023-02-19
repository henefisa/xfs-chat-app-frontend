import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TUserProfile } from 'src/models';
import { RootState } from '.';

const initialState: {
  caller: TUserProfile | null;
} = {
  caller: null,
};

export const mediaCallSlice = createSlice({
  name: 'media call',
  initialState,
  reducers: {
    addCurrentCaller: (state, action: PayloadAction<TUserProfile>) => {
      state.caller = action.payload;
    },
    removeCaller: (state) => {
      state.caller = null;
    },
  },
});

export const { addCurrentCaller, removeCaller } = mediaCallSlice.actions;
export const selectCaller = (state: RootState) => state.mediaCall;

export default mediaCallSlice.reducer;
