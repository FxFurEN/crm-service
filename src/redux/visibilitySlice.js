import { createSlice } from '@reduxjs/toolkit';

const visibilitySlice = createSlice({
  name: 'visibility',
  initialState: {
    isSkladVisible: true,
    isMagazinVisible: true,
    isOrdersVisible: true,
  },
  reducers: {
    setVisibility: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setVisibility } = visibilitySlice.actions;
export const selectVisibility = (state) => state.visibility;
export default visibilitySlice.reducer;
