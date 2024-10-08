import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  error: null,
  userInfo: JSON.parse(localStorage.getItem("userInfo")) ?? null, //check localstorage to get user info if logged in
  updateSuccess: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setProducts: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.products = payload;
    },
    userLogin: (state, { payload }) => {
      state.userInfo = payload;
      state.error = null;
      state.loading = false;
    },
    userLogout: (state) => {
      state.loading = false;
      state.error = null;
      state.userInfo = null;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    updateUserProfile: (state, { payload }) => {
      state.userInfo = payload;
      state.updateSuccess = true;
      state.error = null;
      state.loading = false;
    },
    resetUpdate: (state) => {
      state.updateSuccess = false;
    },
    setUserOrders: (state,{payload}) => {
      state.error = null;
      state.orders = payload;
      state.loading = false;
    },
  },
});

export const {
  setLoading,
  setError,
  userLogin,
  userLogout,
  updateUserProfile,
  resetUpdate,
  setUserOrders
} = userSlice.actions;
export default userSlice.reducer;

export const userSelector = (state) => state.user;
