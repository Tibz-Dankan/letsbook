import { createSlice } from "@reduxjs/toolkit";

const theInitialState = {
  token: null,
  isLoggedIn: false,
  user: {},
};
export const authSlice = createSlice({
  name: "auth",
  initialState: theInitialState,
  reducers: {
    authenticate(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = !!state.token; // some research here
      state.user = action.payload.user;
      return;
    },
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
// export const { authenticate, logout } = authSlice.actions;
export const authActions = authSlice.actions;
export default authSlice;
