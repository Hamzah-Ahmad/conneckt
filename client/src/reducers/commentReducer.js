import { POST_COMMENT } from "../actions/types";

const initialState = {
  comments: []
};
export default function(state = initialState, action) {
  switch (action.type) {
    case POST_COMMENT:
      // console.log("test");
      return {
        comments: action.payload
      };

    default:
      return state;
  }
}
