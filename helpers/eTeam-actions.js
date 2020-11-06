export const LOGIN = "LOGIN";

export const login = (username, password) => {
  return async (dispatch) => {
    const response = await fetch("http://192.168.1.2:5000/eteam/signin", {
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

    if (resData === 'USER_INVALID') {
        throw new Error('User does not exist!');
    } else if (resData === 'PASSWORD_INVALID') {
        throw new Error('Incorrect password!');
    }

    dispatch({ type: LOGIN, username: username, password: password });
  };
};
