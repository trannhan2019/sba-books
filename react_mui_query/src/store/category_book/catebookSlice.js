import { createSlice } from "@reduxjs/toolkit";

export const cateBookSlice = createSlice({
  name: "cateBook",
  initialState: {
    cateBooks: [],
    cateBook: null,
    totalCate: 0,
  },
  reducers: {
    setCateBooks: (state, action) => {
      state.cateBooks = action.payload;
    },
    setCateBook: (state, action) => {
      state.cateBook = action.payload;
    },
    setTotalCate: (state, action) => {
      state.totalCate = action.payload;
    },
    clearCateBookStore: (state, action) => {
      state.cateBooks = [];
      state.cateBook = null;
      state.totalCate = 0;
    },
  },
});

export const { setCateBooks, setCateBook, setTotalCate, clearCateBookStore } =
  cateBookSlice.actions;

export default cateBookSlice.reducer;
