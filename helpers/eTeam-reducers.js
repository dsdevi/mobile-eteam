import { LOGIN, LOGOUT, TOGGLE, AVAILABILITY, LOCATION } from "./eTeam-actions";

const initialState = {
  username: "",
  name: "",
  token: "",
  contactNumber: "",
  availability: "",
  lat: "",
  lng: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        username: action.username,
        name: action.name,
        token: action.token,
        contactNumber: action.contactNumber,
        availability: action.availability,
        lat: action.lat,
        lng: action.lng,
      };
    case LOGOUT:
      return {
        username: "",
        name: "",
        token: "",
        contactNumber: "",
        availability: "",
        lat: "",
        lng: "",
      };
    case TOGGLE:
      return {
        ...state,
        availability: action.availability,
      };
    case AVAILABILITY:
      return {
        ...state,
        availability: action.value,
      };
    case LOCATION:
      return {
        ...state,
        lat: action.lat,
        lng: action.lng,
      };
  }
  return state;
};
