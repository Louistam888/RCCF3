import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  error: null,
  products: [],
};

export const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setBrands: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.products = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setError, setBrands } = brandsSlice.actions;
export default brandsSlice.reducer;

export const brandsSelector = (state) => state.brands;
