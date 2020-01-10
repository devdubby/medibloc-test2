import { SET_USER_LIST } from "../actions/types";

const initialState = {
  users: [],
}

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_USER_LIST:
      return {
        ...state,
        users: action.users
      }
    default:
      return state;
  }
};