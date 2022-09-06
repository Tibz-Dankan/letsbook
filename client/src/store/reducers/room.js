import { createSlice } from "@reduxjs/toolkit";

const theInitialState = {
  roomsArray: [],
};
export const roomSlice = createSlice({
  name: "room",
  initialState: theInitialState,
  reducers: {
    updateRooms(state, action) {
      state.roomsArray = action.payload.roomsArray;
    },
  },
});

export const roomActions = roomSlice.actions;
export default roomSlice;
