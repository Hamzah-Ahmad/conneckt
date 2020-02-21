import { POST_COMMENT, DELETE_COMMENT } from "../actions/types";

const initialState = {
  comments: []
};
export default function(state = initialState, action) {
  switch (action.type) {
    case POST_COMMENT:
    case DELETE_COMMENT:
      return {
        comments: action.payload
      };

    default:
      return state;
  }
}
