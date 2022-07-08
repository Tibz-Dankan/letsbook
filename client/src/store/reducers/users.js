import { createSlice } from "@reduxjs/toolkit";

const theInitialState = {
  users: [],
  chatWithUser: {},
};
export const usersSlice = createSlice({
  name: "users",
  initialState: theInitialState,
  reducers: {
    registeredUsers(state, action) {
      state.users = action.payload.users;
    },
    chatWithUser(state, action) {
      state.chatWithUser = action.payload.chatWithUser;
    },
    clearUserData(state) {
      state.chatWithUser = {};
    },
  },
});

export const usersActions = usersSlice.actions;
export default usersSlice;
