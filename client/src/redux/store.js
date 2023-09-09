import { combineReducers, configureStore } from "@reduxjs/toolkit";
import products from "./slices/products.js";
import cart from "./slices/cart.js";
import user from "./slices/user.js";
import brands from "./slices/brands.js";

const reducer = combineReducers({
  products,
  cart,
  user,
  brands,
});

export default configureStore({
  reducer,
});
