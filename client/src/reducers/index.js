import { combineReducers } from "redux";
import authReducer from "./authReducer";
import authErrorReducer from "./authErrorReducer";
import postReducer from "./postReducer";
import commentReducer from "./commentReducer";
import likeReducer from "./likeReducer";
import notificationReducer from "./notificationReducer";
import singlePostReducer from "./singlePostReducer";
import followReducer from "./followReducer";

export default combineReducers({
  auth: authReducer,
  error: authErrorReducer,
  posts: postReducer,
  singlePost: singlePostReducer,
  comments: commentReducer,
  likes: likeReducer,
  notifications: notificationReducer,
  followReducer: followReducer
});
