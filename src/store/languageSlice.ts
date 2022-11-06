import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

export const languageSlice = createSlice({
  name: 'language',
  initialState: {
    languageCode: '',
  },
  reducers: {
    changeLanguage: (state, action: PayloadAction<string>) => {
      state.languageCode = action.payload;
    },
  },
});

export const { changeLanguage } = languageSlice.actions;
export const selectLanguage = (state: RootState) => state.language;

export default languageSlice.reducer;
