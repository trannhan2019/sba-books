import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",

  initialState: {
    isLoading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    clearAppStore: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const { setLoading, clearAppStore } = appSlice.actions;

export default appSlice.reducer;
