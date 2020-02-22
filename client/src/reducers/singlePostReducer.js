import { MAKE_POST, EDIT_POST } from "../actions/types";

//Created this reducer becasue useEffect on main homepage runs the function which gets all the posts (i.e. getPosts()). I need to be able to cause a renreder when a new post is created, but I can't put post reducer in as a dependency because that would cause infinite rendering
const initialState = {
  post: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MAKE_POST:
    case EDIT_POST:
      return {
        post: action.payload
      };
    default:
      return state;
  }
  //   return state;
}
