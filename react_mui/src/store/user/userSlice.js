import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userList: [],
    userCurrent: null,
    total: 0,
    count: 0,
  },
  reducers: {
    setUserList: (state, action) => {
      state.userList = action.payload;
    },
    setUserCurrent: (state, action) => {
      state.userCurrent = action.payload;
    },
    setTotalUser: (state, action) => {
      state.total = action.payload;
    },
    setCountUser: (state, action) => {
      state.count = action.payload;
    },
    clearUserStore: (state, action) => {
      state.userList = [];
      state.userCurrent = null;
      state.total = 0;
      state.count = 0;
    },
  },
});

export const {
  setUserList,
  setUserCurrent,
  setTotalUser,
  setCountUser,
  clearUserStore,
} = userSlice.actions;

export default userSlice.reducer;
