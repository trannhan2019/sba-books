import { createSlice } from "@reduxjs/toolkit";

export const companySlice = createSlice({
  name: "company",
  initialState: {
    companies: [],
    company: null,
    total: 0,
  },
  reducers: {
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setCompany: (state, action) => {
      state.company = action.payload;
    },
    setTotalCompany: (state, action) => {
      state.total = action.payload;
    },
    clearCompanyStore: (state, action) => {
      state.companies = [];
      state.company = null;
      state.total = 0;
    },
  },
});

export const { setCompanies, setCompany, setTotalCompany, clearCompanyStore } =
  companySlice.actions;

export default companySlice.reducer;
