import { POST_COMMENT } from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
import axios from "axios";

export const postComment = (postId, commentText) => (dispatch, getState) => {
  const body = JSON.stringify({ commentText });
  axios
    .post(`/api/comments/${postId}`, body, tokenConfig(getState))
    .then(res => {
      //   console.log("comment actions");
      dispatch({
        type: POST_COMMENT,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
