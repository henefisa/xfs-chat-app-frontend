import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IConversation,
  IFriendConvert,
  IUserItemResult,
  TUserProfile,
} from 'src/models';
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

interface IUserConversationState {
  selectedConversation: IConversation | null;
  listConversation: IConversation[];
}

interface IUserState {
  profile: IUserProfileState;
  friend: IUserFriendState;
  conversation: IUserConversationState;
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
  conversation: {
    selectedConversation: null,
    listConversation: [],
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
    updateConversationSelected: (
      state,
      action: PayloadAction<IConversation>
    ) => {
      state.conversation.selectedConversation = action.payload;
    },
    deleteConversationSelected: (state) => {
      state.conversation.selectedConversation = null;
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
  updateConversationSelected,
  deleteConversationSelected,
} = userSlice.actions;

export const selectUserProfile = (state: RootState) =>
  state.user.profile.userProfile;

export const selectFriend = (state: RootState) => state.user.friend;

export const selectConversation = (state: RootState) => state.user.conversation;

export default userSlice.reducer;
