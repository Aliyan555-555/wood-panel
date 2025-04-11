import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';

import baseReducer from './schema/baseSlice';
import coreReducer from './schema/coreSlice';
import veneerReducer from './schema/veneerSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['base', 'core', 'veneer'], // specify which slices you want to persist
};

const rootReducer = combineReducers({
  base: baseReducer,
  core: coreReducer,
  veneer: veneerReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist requires this to be disabled
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
