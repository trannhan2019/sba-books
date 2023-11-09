import { createSlice } from "@reduxjs/toolkit";

export const departmentSlice = createSlice({
  name: "department",
  initialState: {
    departments: [],
    department: null,
    departmentId: 0,
    total: 0,
    count: 0,
  },
  reducers: {
    setDepartments: (state, action) => {
      state.departments = action.payload;
    },
    setDepartment: (state, action) => {
      state.department = action.payload;
    },
    setDepartmentId: (state, action) => {
      state.departmentId = action.payload;
    },
    setTotalDepartment: (state, action) => {
      state.total = action.payload;
    },
    setCountDepartment: (state, action) => {
      state.count = action.payload;
    },
  },
});

export const {
  setDepartments,
  setDepartment,
  setTotalDepartment,
  setCountDepartment,
  setDepartmentId,
} = departmentSlice.actions;

export default departmentSlice.reducer;
