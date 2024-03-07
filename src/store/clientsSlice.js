import { createSlice } from '@reduxjs/toolkit';

const clientsSlice = createSlice({
  name: 'clients',
  initialState: {
    data: [],
  },
  reducers: {
    setClientsData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setClientsData } = clientsSlice.actions;
export const selectClientsData = (state) => state.clients.data;
export default clientsSlice.reducer;
