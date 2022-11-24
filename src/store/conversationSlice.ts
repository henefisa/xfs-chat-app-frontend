import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IConversation } from 'src/models';
import { RootState } from '.';

const initialState = {
  selectedConversation: <IConversation>{},
};

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    updateConversation: (state, action: PayloadAction<IConversation>) => {
      state.selectedConversation = action.payload;
    },
    deleteConversation: (state) => {
      state.selectedConversation = <IConversation>{};
    },
  },
});

export const { updateConversation, deleteConversation } =
  conversationSlice.actions;

export const selectConversation = (state: RootState) =>
  state.conversation.selectedConversation;

export default conversationSlice.reducer;
