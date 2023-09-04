import axios from "axios";
import { setLoading, setError, userLogin } from "../slices/user";

export const login = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const config = {
      //headers contains additional information about the request. Includes additioanl metadata and instructions for the server
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );
    dispatch(userLogin(data));
    localStorage.setItem("userInfo", JSON.stringify(data)); // assigns login iformation to local storage so user does not need to log in again onpage refresh
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
