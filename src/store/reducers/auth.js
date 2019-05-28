import { SET_CURRENT_USER, REQUEST_LOGOUT } from "../constants";
import { isEmpty } from "lodash";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    case REQUEST_LOGOUT:
      return {
        isAuthenticated: false,
        user: {}
      };
    default:
      return state;
  }
};
