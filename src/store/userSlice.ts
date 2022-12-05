import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IConversation,
  IFriendAccept,
  TUserProfile,
  IParticipant,
  IMessages,
} from 'src/models';
import { RootState } from '.';

interface IUserProfileState {
  isFetching: boolean;
  error: boolean;
  userProfile: TUserProfile | null;
}

interface IUserFriendState {
  selectedFriend: TUserProfile | null;
  listFriend: IFriendAccept[] | null;
}

interface IUserConversationState {
  selectedConversation: IConversation | null;
  listConversation: IConversation[];
  hasConversation: boolean;
}

interface IUserParticipantState {
  selectedParticipant: IParticipant | null;
  listParticipant: IParticipant[];
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
  participant: IUserParticipantState;
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
    hasConversation: true,
  },
  participant: {
    selectedParticipant: null,
    listParticipant: [],
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
    updateFriendSelected: (state, action: PayloadAction<TUserProfile>) => {
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
    updateParticipantSelected: (state, action: PayloadAction<IParticipant>) => {
      state.participant.selectedParticipant = action.payload;
    },
    deleteParticipantSelected: (state) => {
      state.participant.selectedParticipant = null;
    },
    deleteConversationSelected: (state) => {
      state.conversation.selectedConversation = null;
    },
    updateProfileFailed: (state) => {
      state.profile.isFetching = false;
      state.profile.error = true;
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
    updateHasConversation: (state, action: PayloadAction<boolean>) => {
      state.conversation.hasConversation = action.payload;
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
  updateParticipantSelected,
  deleteParticipantSelected,
  updateListConversation,
  deleteListConversation,
  getListMessageStart,
  getListMessageSuccess,
  getListMessageFailed,
  updateListMessage,
  updateHasConversation,
} = userSlice.actions;

export const selectUserProfile = (state: RootState) =>
  state.user.profile.userProfile;

export const selectFriend = (state: RootState) => state.user.friend;

export const selectConversation = (state: RootState) => state.user.conversation;

export const selectParticipant = (state: RootState) => state.user.participant;

export const selectMessages = (state: RootState) => state.user.message;

export default userSlice.reducer;
