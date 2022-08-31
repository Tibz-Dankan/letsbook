import { baseUrl } from "../appStore";
import axios from "axios";
import { authActions } from "../reducers/auth";
import { notificationActions } from "../reducers/notification";
import { log } from "../../utils/consoleLog";

export const authenticate = (user, token) => {
  return async (dispatch) => {
    await dispatch(authActions.authenticate({ token: token, user: user }));
  };
};

// TODO: LogoutTimer and clearLogoutTimer(When jwt expire time is added)
export const logOut = () => {
  localStorage.clear();
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
    log(response);
    if (response.data.errorMessage) {
      await dispatch(
        notificationActions.showNotification({
          notificationMsg: response.data.errorMessage,
        })
      );
      throw new Error(response.data.errorMessage);
    }
    // get the expiry time  // to be done later
    await dispatch(
      authActions.authenticate({
        token: response.data.token,
        user: response.data.user,
      })
    );
    saveDataToStorage(response.data.user, response.data.token);
  };
};

export const signup = (userName, email, countrySelected, password, role) => {
  return async (dispatch) => {
    const response = await axios.post(`${baseUrl}/signup`, {
      userName: userName,
      email: email,
      countrySelected: countrySelected,
      password: password,
      userRole: role,
      // TODO: add sign up date here
    });
    log(response);
    if (response.data.errorMessage) {
      await dispatch(
        notificationActions.showNotification({
          notificationMsg: response.data.errorMessage,
        })
      );
      throw new Error(response.data.errorMessage);
    }
    await dispatch(
      notificationActions.showNotification({
        notificationMsg: "Sign up successful, you can now log in",
      })
    );
  };
};

// staff Token validation
export const ValidateStaffToken = (staffToken) => {
  return async (dispatch) => {
    await dispatch(
      authActions.ValidateStaffToken({ StaffSignUpToken: staffToken })
    );
  };
};
