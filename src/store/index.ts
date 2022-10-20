import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import reigterReducer from './registerSlice';
import loginReducer from './loginSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    register: reigterReducer,
    login: loginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
