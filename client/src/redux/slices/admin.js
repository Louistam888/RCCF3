import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  error: null,
  userList: null,
  userRemoval: false,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },

    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    resetError: (state) => {
      state.error = null
      state.loading = false;
      state.userRemoval= false;
    },
    getOrders: (state, { payload }) => {
      state.orders = payload;
      state.error = null;
      state.loading = false;
    },
    getUsers: (state, { payload }) => {
      state.userList = payload;
      state.error = null;
      state.loading = false;
    },
    userDelete: (state) => {
      state.error = null;
      state.loading = false;
      state.userRemoval = true;
    },
  },
});

export const { setLoading, setError, resetError, getUsers, userDelete, getOrders } =
  adminSlice.actions;
export default adminSlice.reducer;

export const adminSelector = (state) => state.admin;
