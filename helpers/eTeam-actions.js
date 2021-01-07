import ENV from "../env";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const logout = (token) => {
  return async (dispatch) => {
    const response = await fetch(`http://${ENV.localhost}:5000/eteam/logout?token=${token}`);

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

    if (resData === "USER_INVALID") {
      throw new Error("User does not exist!");
    } else if (resData === "PASSWORD_INVALID") {
      throw new Error("Incorrect password!");
    }

    dispatch({ type: LOGIN, username: username, token: resData.token });
  };
};
