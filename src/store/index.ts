import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './userSlice';
import reigterReducer from './registerSlice';
import loginLogoutReducer from './loginLogoutSlice';

const loginPersistConfig = {
  key: 'loginLogout',
  version: 1,
  storage,
  whitelist: ['loginLogout'],
};

const rootReducer = combineReducers({
  user: userReducer,
  register: reigterReducer,
  loginLogout: loginLogoutReducer,
});

const persistedReducer = persistReducer(loginPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
