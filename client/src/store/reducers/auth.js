import { createSlice } from "@reduxjs/toolkit";

const theInitialState = {
  token: null,
  isLoggedIn: false,
  user: {},
  StaffSignUpToken: null,
  isValidStaffSignUpToken: false,
};
export const authSlice = createSlice({
  name: "auth",
  initialState: theInitialState,
  reducers: {
    authenticate(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = !!state.token;
      state.user = action.payload.user;
      state.StaffSignUpToken = null;
      state.isValidStaffSignUpToken = false;
      return;
    },
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
      state.user = null;
      state.StaffSignUpToken = null;
      state.isValidStaffSignUpToken = false;
    },
    ValidateStaffToken(state, action) {
      state.StaffSignUpToken = action.payload.StaffSignUpToken;
      state.isValidStaffSignUpToken = !!state.StaffSignUpToken;
    },
  },
});

// Action creators are generated for each case reducer function
// export const { authenticate, logout } = authSlice.actions;
export const authActions = authSlice.actions;
export default authSlice;
