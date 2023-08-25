import { createSlice } from "@reduxjs/toolkit";

const calculateSubtotal = (cartState) => {
  let result = 0;
  cartState.map((item) => (result += item.qty * item.price));
  return Number(result).toFixed(2);
};

export const initialState = {
  loading: false,
  error: null,
  cart: JSON.parse(localStorage.getItem("cartItems")) ?? [], // return empty array if localStorage cartItems is empty
  expressShipping: false,
  subtotal: localStorage.getItem("cartItems")
    ? calculateSubtotal(JSON.parse(localStorage.getItem("cartItems")))
    : 0,
};

const updateLocalStorage = (cart) => {
  localStorage.setItem("cartItems", JSON.stringify(cart));
  localStorage.setItem("subtotal", JSON.stringify(calculateSubtotal(cart)));
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    cartItemAdd: (state, { payload }) => {
      const existingItem = state.cart.find((item) => item.id === payload.id);

      if (existingItem) {
        const existingItemIndex = state.cart.findIndex(
          (item) => item.id === payload.id
        );
        state.cart[existingItemIndex].qty += payload.qty;
      } else {
        state.cart = [...state.cart, payload]; //new preferred way to push payload into state with spread operator instead of .push
      }
      state.loading = false;
      state.error = null;
      updateLocalStorage(state.cart);
      state.subtotal = calculateSubtotal(state.cart);
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    cartItemRemoval: (state, { payload }) => {
      state.cart = [...state.cart].filter((item) => item.id !== payload);
      updateLocalStorage(state.cart);
      state.loading = false;
      state.error = null;
      state.subtotal = calculateSubtotal(state.cart);
    },
    cartItemUpdate: (state, { payload }) => {
      const { id, qty } = payload;
      const indexToBeUpdated = state.cart.findIndex((item) => item.id === id);
      if (indexToBeUpdated !== -1) {
        const updatedItem = {
          ...state.cart[indexToBeUpdated],
          qty: Number(qty),
        };
        state.cart.splice(indexToBeUpdated, 1, updatedItem);
      }
      updateLocalStorage(state.cart);
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setError,
  cartItemAdd,
  cartItemRemoval,
  cartItemUpdate,
} = cartSlice.actions;
export default cartSlice.reducer;

// export const cartSelector = (state) => state.cart;
