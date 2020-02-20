import { GET_POSTS } from "./types";
import axios from "axios";
export const getPosts = () => dispatch => {
  axios.get("/api/posts").then(posts => {
    dispatch({
      type: GET_POSTS,
      payload: posts.data
    });
  });
};
