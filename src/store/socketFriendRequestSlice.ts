import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

export const SFriendRequest = createSlice({
  name: 'friendRequest',
  initialState: false,
  reducers: {
    changeSFriendRequest: (state) => {
      return !state;
    },
  },
});

export const { changeSFriendRequest } = SFriendRequest.actions;
export const selectFriendRequest = (state: RootState) => state.sFriendRequest;

export default SFriendRequest.reducer;
