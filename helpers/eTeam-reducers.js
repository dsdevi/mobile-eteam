import { LOGIN, LOGOUT } from "./eTeam-actions";

const initialState = {
  username: "",
  token: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { username: action.username, token: action.token };
    case LOGOUT:
      return { username: "", token: "" };
  }
  return state;
};
