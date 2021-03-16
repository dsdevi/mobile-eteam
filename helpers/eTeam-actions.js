import ENV from "../env";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const TOGGLE = "TOGGLE";
export const AVAILABILITY = "AVAILABILITY";
export const LOCATION = "LOCATION";

export const setLocation = (token, lat, lng) => {
  return async (dispatch) => {
    const response = await fetch(
      `http://${ENV.localhost}:5000/eteam/location`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionToken: token,
          lat: lat.toString(),
          lng: lng.toString(),
        }),
      }
    );

    if (!response.ok) {
      console.log("setLocation response error");
    }

    const resData = await response.json();
    console.log(resData);

    if (!resData.success) {
      throw new Error(resData.message);
    }

    dispatch({ type: LOCATION, lat: lat, lng: lng });
  };
};

export const availability = (token, value) => {
  return async (dispatch) => {
    const response = await fetch(
      `http://${ENV.localhost}:5000/eteam/availability`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionToken: token,
          value: value,
        }),
      }
    );

    if (!response.ok) {
      console.log("availability response error");
    }

    const resData = await response.json();
    console.log(resData);

    if (!resData.success) {
      console.log("availability resData error");
      throw new Error(resData.message);
    }

    dispatch({ type: AVAILABILITY, value: value });
  };
};

export const accidentSubmit = (details) => {
  return async (dispatch) => {
    const response = await fetch(
      `http://${ENV.localhost}:5000/eteam/submit/accident`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      }
    );

    if (!response.ok) {
      console.log("accidentSubmit response error");
    }

    const resData = await response.json();
    console.log(resData);

    if (!resData.success) {
      console.log("accidentSubmit resData error");
      throw new Error(resData.message);
    }
  };
};

export const eventSubmit = (details) => {
  return async (dispatch) => {
    const response = await fetch(
      `http://${ENV.localhost}:5000/eteam/submit/event`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      }
    );

    if (!response.ok) {
      console.log("eventSubmit response error");
    }

    const resData = await response.json();
    console.log(resData);

    if (!resData.success) {
      console.log("eventSubmit resData error");
      throw new Error(resData.message);
    }
  };
};

export const toggle = (username) => {
  return async (dispatch) => {
    const response = await fetch(
      `http://${ENV.localhost}:5000/eteam/toggleavailability`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username }),
      }
    );

    if (!response.ok) {
      console.log("toggle response error");
    }

    const resData = await response.json();
    console.log(resData);

    if (!resData.success) {
      console.log(resData.message);
    }

    dispatch({ type: TOGGLE, availability: resData.availability });
  };
};

export const logout = (token) => {
  return async (dispatch) => {
    const response = await fetch(
      `http://${ENV.localhost}:5000/eteam/logout?token=${token}`
    );

    const resData = await response.json();
    console.log(resData);

    dispatch({ type: LOGOUT });
  };
};

export const login = (username, password) => {
  return async (dispatch) => {
    const response = await fetch(`http://${ENV.localhost}:5000/eteam/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const resData = await response.json();
    console.log(resData);

    if (!resData.success) {
      throw new Error("Invalid username or password");
    }

    dispatch({
      type: LOGIN,
      username: username,
      name: resData.name,
      token: resData.token,
      contactNumber: resData.contactNumber,
      availability: resData.availability,
      lat: resData.lat,
      lng: resData.lng,
    });
  };
};
