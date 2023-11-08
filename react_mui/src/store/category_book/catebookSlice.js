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
  },
});

export const { setCateBooks, setCateBook, setTotalCate } =
  cateBookSlice.actions;

export default cateBookSlice.reducer;
