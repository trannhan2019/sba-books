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
  },
});

export const { setUserList, setUserCurrent, setTotalUser, setCountUser } =
  userSlice.actions;

export default userSlice.reducer;
