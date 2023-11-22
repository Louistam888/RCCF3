import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  error: null,
  brands: [],
  brand: null,
  brandUpdate:false,
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
      state.brands = payload;
    },
    setBrand: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.product = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    resetError: (state) => {
      state.error = null;
      state.brandUpdate = false;
    },
    setBrandUpdateFlag: (state) => {
      state.BrandUpdate = true;
      state.loading = false;
    },
  },
});

export const { setLoading, setBrands, setBrand, setError, setBrandUpdateFlag } =
  brandsSlice.actions;
export default brandsSlice.reducer;

export const brandsSelector = (state) => state.brands;
