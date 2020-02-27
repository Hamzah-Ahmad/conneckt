import { GET__NOTIFICATIONS } from "../actions/types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
import axios from "axios";

export const getNotifications = () => (dispatch, getState) => {
  axios
    .get(`/api/notifications`, tokenConfig(getState))
    .then(res => {
      // console.log(res.data);
      dispatch({
        type: GET__NOTIFICATIONS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
