import { FOLLOW_USER, LOAD_FOLLOWERS, LOAD_FOLLOWING } from "../actions/types";
const initialState = {
  following: [],
  followers: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case FOLLOW_USER:
      return {
        ...state,
        following: action.payload,
      };
    case LOAD_FOLLOWERS:
      return {
        ...state,
        followers: action.payload,
      };
    case LOAD_FOLLOWING:
      return {
        ...state,
        following: action.payload,
      };
    default:
      return state;
  }
}
