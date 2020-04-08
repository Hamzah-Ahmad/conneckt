import { returnErrors } from "./errorActions";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_FOLLOWERS,
  LOAD_FOLLOWING,
} from "./types";
import axios from "axios";

//Check token and load user
//getState allows us to access part of our state. We use it here to get token from the state
//We want to call loadUser all the time to get constantly get user info as jwt is stateless so user info is not saved in server state
export const loadUser = () => (dispatch, getState) => {
  //User Loading --> sets isLoading to true
  dispatch({ type: USER_LOADING });
  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
      dispatch({
        type: LOAD_FOLLOWERS,
        payload: res.data.followers,
      });
      dispatch({
        type: LOAD_FOLLOWING,
        payload: res.data.following,
      });
      // console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      // console.log("Load User Error");
      // console.log(err.response.data);
      // console.log(err.response.status);
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// Register User
export const register = ({ name, email, password }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request body
  const body = JSON.stringify({ name, email, password });

  axios
    .post("/api/users", body, config)
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      console.log(err);
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

//Login User
export const login = ({ email, password }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request body
  const body = JSON.stringify({ email, password });

  axios
    .post("/api/auth", body, config)
    .then((res) =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      console.log(err);
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

//change user image
export const changeImage = (data, cb) => async (dispatch, getState) => {
  const imageUrl = data.data.secure_url;
  const body = JSON.stringify({ imageUrl });

  axios
    .post("/api/auth/imageUpload", body, tokenConfig(getState))
    .then((res) => cb());
};
//Logout user
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

//Setup config/headers and token
export const tokenConfig = (getState) => {
  //this getState is provided as an arg to tokenConfig wherever the funciton is called
  //Get token from local storage
  const token = getState().auth.token; //gets token from state in authReducer

  //Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  //if token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
