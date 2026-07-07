import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light', // 'light' or 'dark'
  isSidebarOpen: false,
  globalLoading: false,
  modalParams: null, // e.g., { type: 'confirmation', data: {} }
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setSidebarOpen: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
    setGlobalLoading: (state, action) => {
      state.globalLoading = action.payload;
    },
    openModal: (state, action) => {
      state.modalParams = action.payload;
    },
    closeModal: (state) => {
      state.modalParams = null;
    },
  },
});

export const { toggleTheme, setSidebarOpen, setGlobalLoading, openModal, closeModal } = uiSlice.actions;

export default uiSlice.reducer;
