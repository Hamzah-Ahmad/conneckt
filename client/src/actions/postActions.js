import { GET_POSTS, MAKE_POST, DELETE_POST, EDIT_POST } from "./types";
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
export const deletePost = postId => (dispatch, getState) => {
  console.log(postId);

  axios
    .delete(`/api/posts/${postId}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: DELETE_POST
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
export const editPost = (postId, content) => (dispatch, getState) => {
  console.log("Edited Post");
  const body = JSON.stringify({ content });
  axios
    .patch(`/api/posts/${postId}`, body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: EDIT_POST,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
