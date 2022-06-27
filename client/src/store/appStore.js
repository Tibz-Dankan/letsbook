import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
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
