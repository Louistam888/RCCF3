import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  error: null,
  products: [],
  product: null,
  productUpdate: false,
};

export const productsSlice = createSlice({
  name: "products",
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
    setProduct: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.product = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
      state.productUpdate = false;
    },
    resetError: (state) => {
      state.error = null;
      state.productUpdate = false;
    },
    
    setProductUpdateFlag: (state) => {
      state.productUpdate = true;
      state.loading = false;
    },
  },
});

export const {
  setLoading,
  setError,
  setProducts,
  setProduct,
  resetError,
  setProductUpdateFlag,
} = productsSlice.actions;
export default productsSlice.reducer;

export const productsSelector = (state) => state.products;
