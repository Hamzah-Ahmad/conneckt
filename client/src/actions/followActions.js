import { FOLLOW_USER } from "../actions/types";
import { tokenConfig } from "./authActions";
// import { returnErrors } from "./errorActions";
import axios from "axios";

export const followUser = userId => (dispatch, getState) => {
  axios
    .post(`/api/follow/${userId}`, null, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: FOLLOW_USER,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      // dispatch(returnErrors(err.response.data, err.response.status));
    });
};
