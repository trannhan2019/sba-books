import { createSlice } from "@reduxjs/toolkit";

export const notifySlice = createSlice({
  name: "notify",

  initialState: {
    notifications: [],
    notiUnreadCount: 0,
  },
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },

    setNotiUnreadCount: (state, action) => {
      state.notiUnreadCount = action.payload;
    },

    clearNotifyStore: (state, action) => {
      state.notifications = [];
      state.notiUnreadCount = 0;
    },
  },
});

export const { setNotifications, setNotiUnreadCount, clearNotifyStore } =
  notifySlice.actions;

export default notifySlice.reducer;
