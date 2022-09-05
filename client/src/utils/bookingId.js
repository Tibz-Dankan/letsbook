import { log } from "./consoleLog";

// generate booking id
export const generateBookingIdString = (bookingIdFromDb) => {
  const bookingIdString = "#LBR" + bookingIdFromDb;
  log(bookingIdString);
  return bookingIdString;
};
