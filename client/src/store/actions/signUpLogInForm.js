import { signUpLogInActions } from "../reducers/signUpLogInForm";

export const hideLogInForm = () => {
  return async (dispatch) => {
    await dispatch(signUpLogInActions.hideLogInForm());
  };
};

export const hideSignUpForm = () => {
  return async (dispatch) => {
    await dispatch(signUpLogInActions.hideSignUpForm());
  };
};
