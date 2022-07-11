import { createSlice } from "@reduxjs/toolkit";

const theInitialState = {
  bookingStep: { step: 1, bookingId: null },
};
export const bookingSlice = createSlice({
  name: "booking",
  initialState: theInitialState,
  reducers: {
    bookingProcess(state, action) {
      state.bookingStep = action.payload.bookingStep;
    },
    endBookingProcess(state) {
      state.bookingProcess = { step: 1, bookingId: null };
    },
  },
});

export const bookingActions = bookingSlice.actions;
export default bookingSlice;
