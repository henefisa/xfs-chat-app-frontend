import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFriendAccept } from 'src/models';
import { RootState } from '.';

const initialState = { selectedFriend: <IFriendAccept>{} };

export const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    updateFriendSelected: (state, action: PayloadAction<IFriendAccept>) => {
      state.selectedFriend = action.payload;
    },
    deleteFriend: (state) => {
      state.selectedFriend = <IFriendAccept>{};
    },
  },
});

export const { updateFriendSelected, deleteFriend } = friendSlice.actions;

export const selectFriend = (state: RootState) => state.friend.selectedFriend;

export default friendSlice.reducer;
