import { createSlice } from "@reduxjs/toolkit";

const theInitialState = {
  bookingStep: { step: 1, bookingId: null },
  value: false,
  showBookingDatesComponent: true,
  showBookRoomComponent: false,
  showMyBookingComponent: false,
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
    showBookingDates(state) {
      state.showBookingDatesComponent = true;
      state.showBookRoomComponent = false;
      state.showMyBookingComponent = false;
    },
    showBookRoom(state) {
      state.showBookingDatesComponent = false;
      state.showBookRoomComponent = true;
      state.showMyBookingComponent = false;
    },
    showMyBooking(state) {
      state.showBookingDatesComponent = false;
      state.showBookRoomComponent = false;
      state.showMyBookingComponent = true;
    },
    hideAllBookingComponents(state) {
      state.showBookingDatesComponent = false;
      state.showBookRoomComponent = false;
      state.showMyBookingComponent = false;
    },
  },
});

export const bookingActions = bookingSlice.actions;
export default bookingSlice;
