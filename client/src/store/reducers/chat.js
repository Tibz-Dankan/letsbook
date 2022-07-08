import { createSlice } from "@reduxjs/toolkit";

const theInitialState = {
  messages: [],
};
export const chatSlice = createSlice({
  name: "chat",
  initialState: theInitialState,
  reducers: {
    chatMessages(state, action) {
      state.messages = action.payload.messages;
    },
    clearChatMessages(state) {
      state.messages = [];
    },
  },
});

export const chatActions = chatSlice.actions;
export default chatSlice;
