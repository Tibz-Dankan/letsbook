import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import usersSlice from "./reducers/users";
import chatSlice from "./reducers/chat";
import notificationSlice from "./reducers/notification";
import bookingSlice from "./reducers/booking";
import roomSlice from "./reducers/room";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    users: usersSlice.reducer,
    chat: chatSlice.reducer,
    notification: notificationSlice.reducer,
    booking: bookingSlice.reducer,
    room: roomSlice.reducer,
  },
});

let baseUrl;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  baseUrl = "http://localhost:8000";
} else {
  baseUrl = "https://letsbook.herokuapp.com";
}

export { baseUrl };
export default store;
