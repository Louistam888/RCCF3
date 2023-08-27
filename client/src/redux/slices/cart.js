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

      //New copy of the state.cart array is made since redux state cannot be edited immutably. Below code makes a copy of all array items before and after the index to be updated, and updates the item to be updated. Then the entire copy of the array is assigned ot replace state.cart

      if (indexToBeUpdated !== -1) {
        const updatedCart = [
          ...state.cart.slice(0, indexToBeUpdated), // Copy items before the updated item in the array
          {
            ...state.cart[indexToBeUpdated], // Copy the properties of the existing item
            qty: Number(qty), // Update qty
          },
          ...state.cart.slice(indexToBeUpdated + 1), // Copy items after the updated item in the array
        ];

        state.cart = updatedCart; // Update the cart with the new updatedCart array
      }
      updateLocalStorage(state.cart);
      state.subtotal = calculateSubtotal(state.cart);
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
