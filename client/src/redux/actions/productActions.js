import axios from "axios";
import {
  setProducts,
  setLoading,
  setError,
  setProduct,
  resetError,
  productReviewed,
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

export const createProductReview =
  (productId, userId, comment, rating, title) => async (dispatch, getState) => {
    dispatch(setLoading(true));
    const {
      user: { userInfo },
    } = getState();

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `/api/products/reviews/${productId}`,
        { comment, userId, rating, title },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch(productReviewed());
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

//this function resets useToast so that after every update useToast will work
export const resetUpdateSuccess = () => async (dispatch) => {
  dispatch(resetError());
};
