import { createSlice } from "@reduxjs/toolkit";

const theInitialState = {
  value: true,
};
export const signUpLogInFormSlice = createSlice({
  name: "signUpLogInForm",
  initialState: theInitialState,
  reducers: {
    hideLogInForm(state) {
      state.value = !state.value;
    },
    hideSignUpForm(state) {
      state.value = !state.value;
    },
  },
});

export const signUpLogInActions = signUpLogInFormSlice.actions;
export default signUpLogInFormSlice;
