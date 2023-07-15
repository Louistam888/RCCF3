import { combineReducers, configureStore } from "@reduxjs/toolkit";
import products from "./slices/products.js";
import brands from "./slices/brands.js";

const reducer = combineReducers({
  products,
  brands,
});

export default configureStore({
  reducer,
});
