import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFriendAccept } from 'src/models';
import { RootState } from '.';

const initialState = { selectedFriend: <IFriendAccept>{} };

export const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    clickFriend: (state, action: PayloadAction<IFriendAccept>) => {
      state.selectedFriend = action.payload;
    },
  },
});

export const { clickFriend } = friendSlice.actions;

export const selectFriend = (state: RootState) => state.friend.selectedFriend;

export default friendSlice.reducer;
