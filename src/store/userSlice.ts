import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFriendConvert, IUserItemResult, TUserProfile } from 'src/models';
import { RootState } from '.';

interface IUserProfileState {
  isFetching: boolean;
  error: boolean;
  userProfile: TUserProfile | null;
}

interface IUserFriendState {
  selectedFriend: IUserItemResult | null;
  listFriend: IFriendConvert[] | null;
}

interface IUserState {
  profile: IUserProfileState;
  friend: IUserFriendState;
}

const initialState: IUserState = {
  profile: {
    isFetching: false,
    error: false,
    userProfile: null,
  },
  friend: {
    selectedFriend: null,
    listFriend: null,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
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
      state.profile.userProfile = null;
    },
    updateFriendSelected: (state, action: PayloadAction<IUserItemResult>) => {
      state.friend.selectedFriend = action.payload;
    },
    deleteFriendSelected: (state) => {
      state.friend.selectedFriend = null;
    },
    updateListFriend: (state, action: PayloadAction<IFriendConvert[]>) => {
      state.friend.listFriend = action.payload;
    },
    deleteListFriend: (state) => {
      state.friend.listFriend = null;
    },
    updateProfileFailed: (state) => {
      state.profile.isFetching = false;
      state.profile.error = true;
    },
  },
});

export const {
  getProfileStart,
  getProfileSuccess,
  getProfileFailed,
  deleteUserProfile,
  updateProfileFailed,
  updateFriendSelected,
  deleteFriendSelected,
  updateListFriend,
  deleteListFriend,
} = userSlice.actions;

export const selectUserProfile = (state: RootState) =>
  state.user.profile.userProfile;

export const selectFriend = (state: RootState) => state.user.friend;

export default userSlice.reducer;
