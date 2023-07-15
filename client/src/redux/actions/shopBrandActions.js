import axios from "axios";
import { setBrands, setLoading, setError } from "../slices/brands.js";
import { useParams } from "react-router-dom";

export const getBrands = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get("/api/brands/");
    dispatch(setBrands(data));
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
