/* eslint-disable no-unused-vars */
import { baseUrl } from "../appStore";
import axios from "axios";
import { authActions } from "../reducers/auth";

export const logOut = () => {
  localStorage.removeItem("userData");
  return authActions.logout();
};

const saveDataToStorage = (user, token) => {
  localStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      user: user,
    })
  );
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await axios.post(`${baseUrl}/login`, {
      email: email,
      password: password,
    });
    console.log(response);
    if (response.data.errorMessage) {
      //   Dispatch an alert msg in the model
      throw new Error(response.data.errorMessage);
    }
    // get the expiry time  // to be done later
    // dispatch authenticate action
    await dispatch(
      authActions.authenticate({
        token: response.data.token,
        user: response.data.user,
      })
    );
    // dispatch an alert msg  // to be done later
    saveDataToStorage(response.data.user, response.data.token);
  };
};

export const signup = (userName, email, country, password) => {
  return async (dispatch) => {
    const response = await axios.post(`${baseUrl}/signup`, {
      userName: userName,
      email: email,
      country: country.label,
      password: password,
    });
    console.log(response);
    if (response.data.errorMessage) {
      // dispatch an alert msg with the user via a modal
      throw new Error(response.data.errorMessage);
    }
    if (response.data.status === "success") {
      // dispatch an alert msg via a  modal
    }
  };
};
