import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import usersSlice from "./reducers/users";
import chatSlice from "./reducers/chat";
import notificationSlice from "./reducers/notification";
import signUpLogInFormSlice from "./reducers/signUpLogInForm";
import bookingSlice from "./reducers/booking";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    users: usersSlice.reducer,
    chat: chatSlice.reducer,
    notification: notificationSlice.reducer,
    signUpLogInForm: signUpLogInFormSlice.reducer,
    booking: bookingSlice.reducer,
  },
});

let baseUrl;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  baseUrl = "http://localhost:8000";
} else {
  baseUrl = "some production url here";
}

export { baseUrl };
export default store;
