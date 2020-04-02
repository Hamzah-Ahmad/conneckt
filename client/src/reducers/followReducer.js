import { FOLLOW_USER } from "../actions/types";
const initialState = {
  following: []
};
export default function(state = initialState, action) {
  switch (action.type) {
    case FOLLOW_USER:
      return {
        following: action.payload
      };
    default:
      return state;
  }
}
