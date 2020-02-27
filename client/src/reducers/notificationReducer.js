import { GET__NOTIFICATIONS } from "../actions/types";
const initialState = {
  notifications: []
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET__NOTIFICATIONS:
      return {
        notifications: action.payload
      };
    default:
      return state;
  }
}
