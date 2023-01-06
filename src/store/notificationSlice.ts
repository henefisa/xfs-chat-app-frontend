import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

const initialState = false;

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    updateNotification: (state) => {
      return !state;
    },
  },
});

export const { updateNotification } = notificationSlice.actions;

export const selectNotification = (state: RootState) => state.notification;

export default notificationSlice.reducer;
