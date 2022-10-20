import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import reigterReducer from './registerSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    register: reigterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
