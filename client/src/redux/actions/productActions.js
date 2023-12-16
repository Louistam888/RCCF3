import axios from "axios";
import {
  setProducts,
  setLoading,
  setError,
  setProduct,
  resetError,
} from "../slices/products.js";

export const getProducts = (brandURL) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(`/api/products/shop/${brandURL}`);
    dispatch(setProducts(data));
    //add condition for if it is adminconsolescreen run without brandurl
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

export const resetProductError = () => async (dispatch) => {
  dispatch(resetError());
};
