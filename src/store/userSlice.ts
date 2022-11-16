import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserProfile } from 'src/models';
import { RootState } from '.';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: { isFetching: false, error: false, userProfile: <IUserProfile>{} },
  },
  reducers: {
    getProfileStart: (state) => {
      state.profile.isFetching = true;
    },
    getProfileSuccess: (state, action: PayloadAction<IUserProfile>) => {
      state.profile.isFetching = false;
      state.profile.error = false;
      state.profile.userProfile = action.payload;
    },
    getProfileFailed: (state) => {
      state.profile.isFetching = false;
      state.profile.error = true;
    },
    deleteUserProfile: (state) => {
      state.profile.userProfile = <IUserProfile>{};
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
