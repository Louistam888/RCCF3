import axios from "axios";
import { setProducts, setLoading, setError } from "../slices/products.js";

export const getProducts = (brandURL) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(`/api/products/shop/${brandURL}`);

    if (data.length === 0) {
      // Throw a 404 error response with an error message
      throw new Error("No products found for the given brand.");
    }

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
