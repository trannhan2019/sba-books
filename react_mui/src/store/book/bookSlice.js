import { createSlice } from "@reduxjs/toolkit";

export const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: [],
    book: null,
    cate_book_id: 0,
    total: 0,
    count: 0,
  },
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    setBook: (state, action) => {
      state.book = action.payload;
    },
    // setDepartmentId: (state, action) => {
    //   state.departmentId = action.payload;
    // },
    setTotalBook: (state, action) => {
      state.total = action.payload;
    },
    setCountBook: (state, action) => {
      state.count = action.payload;
    },
  },
});

export const { setBook, setBooks, setCountBook, setTotalBook } =
  bookSlice.actions;

export default bookSlice.reducer;
