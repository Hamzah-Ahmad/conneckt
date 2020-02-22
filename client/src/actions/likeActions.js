import { LIKE_POST } from "../actions/types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
import axios from "axios";

export const likePost = postId => (dispatch, getState) => {
  axios
    .post(`/api/post/like/${postId}`, null, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: LIKE_POST,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
