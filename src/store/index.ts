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
import authReducer from './authSlice';
import navbarReducer from './navbarSlice';
import languageReducer from './languageSlice';
import conversationReducer from './conversationSlice';
import darkLightReducer from './darkLightSlice';
import mediaCallReducer from './callSlice';

const loginPersistConfig = {
  key: 'login',
  version: 1,
  storage,
  whitelist: ['login'],
};

const languagePersistConfig = {
  key: 'language',
  version: 2,
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  navbar: navbarReducer,
  darkLight: darkLightReducer,
  auth: persistReducer(loginPersistConfig, authReducer),
  language: persistReducer(languagePersistConfig, languageReducer),
  conversation: conversationReducer,
  mediaCall: mediaCallReducer,
});

const store = configureStore({
  reducer: rootReducer,
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
