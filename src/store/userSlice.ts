import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IConversation,
  IFriendAccept,
  IMessages,
  TUserProfile,
} from 'src/models';
import { RootState } from '.';

interface IUserProfileState {
  isFetching: boolean;
  error: boolean;
  userProfile: TUserProfile | null;
}

interface IUserFriendState {
  selectedFriend: IFriendAccept | null;
  listFriend: IFriendAccept[] | null;
}

interface IUserConversationState {
  selectedConversation: IConversation | null;
  listConversation: IConversation[];
}

interface IUserMessage {
  listMessage: IMessages[];
  isFetching: boolean;
  error: boolean;
}

interface IUserState {
  profile: IUserProfileState;
  friend: IUserFriendState;
  conversation: IUserConversationState;
  message: IUserMessage;
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
  message: {
    listMessage: [],
    isFetching: false,
    error: false,
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
    updateFriendSelected: (state, action: PayloadAction<IFriendAccept>) => {
      state.friend.selectedFriend = action.payload;
    },
    deleteFriendSelected: (state) => {
      state.friend.selectedFriend = null;
    },
    updateConversationSelected: (
      state,
      action: PayloadAction<IConversation>
    ) => {
      state.conversation.selectedConversation = action.payload;
    },
    updateListConversation: (state, action: PayloadAction<IConversation[]>) => {
      state.conversation.listConversation = action.payload;
    },
    deleteListConversation: (state) => {
      state.conversation.listConversation = [];
    },
    updateProfileFailed: (state) => {
      state.profile.isFetching = false;
      state.profile.error = true;
    },
    deleteConversationSelected: (state) => {
      state.conversation.selectedConversation = null;
    },
    getListMessageStart: (state) => {
      state.message.isFetching = true;
    },
    getListMessageSuccess: (state, action: PayloadAction<IMessages[]>) => {
      state.message.isFetching = false;
      state.message.error = false;
      state.message.listMessage = action.payload.reverse();
    },
    getListMessageFailed: (state) => {
      state.message.isFetching = false;
      state.message.error = true;
    },
    updateListMessage: (state, action: PayloadAction<IMessages>) => {
      state.message.listMessage.push(action.payload);
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
  updateConversationSelected,
  deleteConversationSelected,
  updateListConversation,
  deleteListConversation,
  getListMessageStart,
  getListMessageSuccess,
  getListMessageFailed,
  updateListMessage,
} = userSlice.actions;

export const selectUserProfile = (state: RootState) =>
  state.user.profile.userProfile;

export const selectFriend = (state: RootState) => state.user.friend;

export const selectConversation = (state: RootState) => state.user.conversation;

export const selectMessages = (state: RootState) => state.user.message;

export default userSlice.reducer;
