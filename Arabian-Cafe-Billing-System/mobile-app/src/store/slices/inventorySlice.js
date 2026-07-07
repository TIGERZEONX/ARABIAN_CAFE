import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  categories: [],
  isLoading: false,
  error: null,
  searchQuery: '',
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setItems, setCategories, setSearchQuery, setError } = inventorySlice.actions;

export default inventorySlice.reducer;
