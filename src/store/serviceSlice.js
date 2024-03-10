import { createSlice } from '@reduxjs/toolkit';

const serviceSlice = createSlice({
  name: 'services',
  initialState: {
    services: [],
    categories: [],
  },
  reducers: {
    setServicesData: (state, action) => {
      state.services = action.payload.services;
      state.categories = action.payload.categories;
    },
  },
});

export const { setServicesData } = serviceSlice.actions;

export const selectServices = (state) => state.services.services;
export const selectCategories = (state) => state.services.categories;

export default serviceSlice.reducer;
