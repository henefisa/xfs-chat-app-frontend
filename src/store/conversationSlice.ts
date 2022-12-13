import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IConversation, IMessages } from 'src/models';
import { RootState } from '.';

interface IUserConversationState {
  selectedConversation: IConversation | null;
  listConversation: IConversation[];
}

interface IUserMessage {
  listMessage: IMessages[];
  isFetching: boolean;
  error: boolean;
}

interface IConversationState {
  conversation: IUserConversationState;
  message: IUserMessage;
}

const initialState: IConversationState = {
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

export const conversationSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateConversationSelected: (
      state,
      action: PayloadAction<IConversation>
    ) => {
      state.conversation.selectedConversation = action.payload;
    },
    deleteConversationSelected: (state) => {
      state.conversation.selectedConversation = null;
    },
    updateListConversation: (state, action: PayloadAction<IConversation[]>) => {
      state.conversation.listConversation = action.payload;
    },
    deleteListConversation: (state) => {
      state.conversation.listConversation = [];
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
  updateConversationSelected,
  deleteConversationSelected,
  updateListConversation,
  deleteListConversation,
  getListMessageStart,
  getListMessageSuccess,
  getListMessageFailed,
  updateListMessage,
} = conversationSlice.actions;

export const selectConversation = (state: RootState) =>
  state.conversation.conversation;

export default conversationSlice.reducer;
