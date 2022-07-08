import { createSlice } from "@reduxjs/toolkit";

const theInitialState = {
  value: false,
  notificationMsg: "",
};
export const notificationSlice = createSlice({
  name: "notification",
  initialState: theInitialState,
  reducers: {
    showNotification(state, action) {
      state.value = !state.value;
      state.notificationMsg = action.payload.notificationMsg;
    },
    hideNotification(state) {
      state.value = !state.value;
      state.notificationMsg = "";
    },
  },
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice;
