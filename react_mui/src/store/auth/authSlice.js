import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    clearAuthStore: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { setUser, setIsLoggedIn, clearAuthStore } = authSlice.actions;

export default authSlice.reducer;
