import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUserProfile } from 'src/models';
import { RootState } from '.';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: { isFetching: false, error: false, userProfile: <TUserProfile>{} },
  },
  reducers: {
    getProfileStart: (state) => {
      state.profile.isFetching = true;
    },
    getProfileSuccess: (state, action: PayloadAction<TUserProfile>) => {
      state.profile.isFetching = false;
      state.profile.error = false;
      state.profile.userProfile = action.payload;
    },
    getProfileFailed: (state) => {
      state.profile.isFetching = false;
      state.profile.error = true;
    },
    deleteUserProfile: (state) => {
      state.profile.userProfile = <TUserProfile>{};
    },
  },
});

export const {
  getProfileStart,
  getProfileSuccess,
  getProfileFailed,
  deleteUserProfile,
} = userSlice.actions;

export const selectUserProfile = (state: RootState) =>
  state.user.profile.userProfile;

export default userSlice.reducer;
