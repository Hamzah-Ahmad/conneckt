import { GET_POSTS, MAKE_POST } from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

import axios from "axios";
export const getPosts = () => dispatch => {
  axios.get("/api/posts").then(posts => {
    dispatch({
      type: GET_POSTS,
      payload: posts.data
    });
  });
};
export const makePost = content => (dispatch, getState) => {
  console.log("Made Post");
  const body = JSON.stringify({ content });
  axios
    .post("/api/posts", body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: MAKE_POST,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
