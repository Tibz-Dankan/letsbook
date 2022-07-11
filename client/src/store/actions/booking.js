import axios from "axios";
import { baseUrl } from "../appStore";
import { bookingActions } from "../reducers/booking";
import { notificationActions } from "../reducers/notification";
import { log } from "../../utils/consoleLog";

export const saveBookingProcessToStorage = (stepNumber, bookingId) => {
  localStorage.setItem(
    "bookingStep",
    JSON.stringify({
      bookingStep: { step: stepNumber, bookingId: bookingId },
    })
  );
};

const requestBodyData = (checkInDate, checkOutDate) => {
  return {
    checkInDate: JSON.stringify({ date: new Date(checkInDate) }),
    checkOutDate: JSON.stringify({ date: new Date(checkOutDate) }),
    bookingDate: JSON.stringify({ date: new Date(Date.now()) }),
  };
};

export const submitBookingDates = (
  checkInDate,
  checkOutDate,
  userId,
  token
) => {
  return async (dispatch) => {
    const response = await axios.post(
      `${baseUrl}/booking-date/${userId}`,
      requestBodyData(checkInDate, checkOutDate),
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    log(response);
    if (response.data.errorMessage) {
      throw new Error(response.data.errorMessage);
    }
    await dispatch(
      bookingActions.bookingProcess({
        bookingStep: { step: 2, bookingId: response.data.bookingId },
      })
    );
    saveBookingProcessToStorage(2, response.data.bookingId);
  };
};

export const bookingRoom = (bookingId, roomId, token) => {
  return async (dispatch) => {
    const response = await axios.post(
      `${baseUrl}/book-room/${bookingId}/${roomId}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.data.errorMessage) {
      throw new Error(response.data.errorMessage);
    }
    await dispatch(
      bookingActions.bookingProcess({
        bookingStep: { step: 3, bookingId: bookingId },
      })
    );
    saveBookingProcessToStorage(3, bookingId);
  };
};
