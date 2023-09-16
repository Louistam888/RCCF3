import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  error: null,
  shippingAddress: null,
  orderInfo: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },

    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    shippingAddressAdd: (state, { payload }) => {
      state.shippingAddress = payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setError, shippingAddressAd } = orderSlice.actions;
export default orderSlice.reducer;

export const orderSelector = (state) => state.user;
