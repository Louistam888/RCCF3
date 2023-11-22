import axios from "axios";
import { setLoading, setError, setBrands } from "../slices/brands";

export const getBrands = () => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const { data } = await axios.get(`/api/brands/shop`);
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

// export const resetBrandError = () => async (dispatch) => {
//   dispatch(resetError());
// };
