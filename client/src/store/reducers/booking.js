import { createSlice } from "@reduxjs/toolkit";

const theInitialState = {
  bookingStep: { step: 1, bookingId: null },
  value: false,
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
    showBookingModal(state) {
      state.value = !state.value;
    },
    hideBookingModal(state) {
      state.value = !state.value;
    },
  },
});

export const bookingActions = bookingSlice.actions;
export default bookingSlice;
