import { combineReducers } from "redux";
import authReducer from "./authReducer";
import authErrorReducer from "./authErrorReducer";
import postReducer from "./postReducer";
import "bootstrap/dist/css/bootstrap.min.css";
import commentReducer from "./commentReducer";

export default combineReducers({
  auth: authReducer,
  error: authErrorReducer,
  posts: postReducer,
  comments: commentReducer
});
