import { createSlice } from '@reduxjs/toolkit';

const visibilitySlice = createSlice({
  name: 'visibility',
  initialState: {
    isSkladVisible: true,
    isMagazinVisible: true,
    isOrdersVisible: true,
    documentContent: "", // Добавляем поле для хранения содержимого документа
  },
  reducers: {
    setVisibility: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    toggleVisibility: (state, action) => {
      const { field } = action.payload;
      return {
        ...state,
        [field]: !state[field],
      };
    },
    // Добавляем действие для сохранения содержимого документа
    setDocumentContent: (state, action) => {
      state.documentContent = action.payload;
    },
  },
});

export const { setVisibility, toggleVisibility, setDocumentContent } = visibilitySlice.actions;
export const selectVisibility = (state) => state.visibility;
export const selectDocumentContent = (state) => state.visibility.documentContent; // Создаем селектор для получения содержимого документа
export default visibilitySlice.reducer;
