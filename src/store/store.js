import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import visibilityReducer from './visibilitySlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, visibilityReducer);

const store = configureStore({
  reducer: {
    visibility: persistedReducer,
  },
});

export const persistor = persistStore(store);
export default store;
