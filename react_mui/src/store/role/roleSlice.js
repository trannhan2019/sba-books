import { createSlice } from "@reduxjs/toolkit";

export const roleSlice = createSlice({
  name: "role",
  initialState: {
    roles: [],
    role: null,
    total: 0,
    count: 0,
  },
  reducers: {
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setTotalRole: (state, action) => {
      state.total = action.payload;
    },
    setCountRole: (state, action) => {
      state.count = action.payload;
    },
  },
});

export const { setRoles, setRole, setTotalRole, setCountRole } =
  roleSlice.actions;

export default roleSlice.reducer;
