import { LIKE_POST } from "../actions/types";
const initialState = {
  likes: []
};
export default function(state = initialState, action) {
  switch (action.type) {
    case LIKE_POST:
      return {
        likes: action.payload
      };
    default:
      return state;
  }
}
