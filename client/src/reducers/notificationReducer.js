import { GET__NOTIFICATIONS, DELETE_NOTIFICATION } from "../actions/types";
const initialState = {
  notifications: []
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET__NOTIFICATIONS:
      return {
        notifications: action.payload
      };
    case DELETE_NOTIFICATION:
      return {
        notifications: action.payload
      };
    default:
      return state;
  }
}
