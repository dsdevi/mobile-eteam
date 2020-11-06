import { LOGIN } from "./eTeam-actions";

const initialState = {
  username: "",
  password: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { username: action.username, password: action.password };
  }
  return state;
};
