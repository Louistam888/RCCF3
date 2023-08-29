import axios from "axios";
import {
  setLoading,
  setError,
  cartItemAdd,
  cartItemRemoval,
  cartItemUpdate,
} from "../slices/cart";

export const addCartItem = (id, qty, brand) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(`/api/products/shop/${brand}/${id}`);
    const itemToAdd = {
      id: data._id,
      name: data.name,
      image: data.image,
      brand: data.brand,
      price: data.price,
      stock: data.stock,
      qty,
    };
    dispatch(cartItemAdd(itemToAdd));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error has occurred. Please try again later."
      )
    );
  }
};

export const removeCartItem = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    dispatch(cartItemRemoval(id));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error has occurred. Please try again later."
      )
    );
  }
};

export const updateCartItem = (id, qty) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    dispatch(cartItemUpdate({ id, qty }));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error has occurred. Please try again later."
      )
    );
  }
};
