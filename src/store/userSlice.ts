import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    password: '',
  },
  reducers: {
    usernameChange: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    passwordChange: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
});

export const { usernameChange, passwordChange } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
