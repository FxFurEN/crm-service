import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import visibilityReducer from './visibilitySlice';
import clientsReducer from './clientsSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, visibilityReducer, clientsReducer);

const store = configureStore({
  reducer: {
    visibility: persistedReducer,
    clients: clientsReducer,
  },
});

export const persistor = persistStore(store);
export default store;
