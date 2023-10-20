import axios from "axios";
import {
  setProducts,
  setLoading,
  setError,
  setProduct,
  setProductUpdateFlag
} from "../slices/products.js";

export const getProducts = (brandURL) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(`/api/products/shop/${brandURL}`);
    dispatch(setProducts(data));
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

export const getProduct = (brandURL, id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const url = `/api/products/shop/${brandURL}/${id}`;
    const { data } = await axios.get(url);
    dispatch(setProduct(data));
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

