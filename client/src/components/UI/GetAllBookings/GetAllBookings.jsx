import React, { Fragment, useState, useRef, useEffect } from "react";
import styles from "./GetAllBookings.module.scss";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { baseUrl } from "../../../store/appStore";
import { showNotificationModal } from "../../../store/actions/notification";
import { FadeLoader } from "react-spinners";
import { log } from "../../../utils/consoleLog";
import { generateBookingIdString } from "../../../utils/bookingId";
import Modal from "../Modal/Modal";

const GetAllBookings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [isError, setIsError] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const showAlertModal = useSelector((state) => state.notification.value);
  const effectRan = useRef(false);

  const getAllBookings = () => {
    return async () => {
      const response = await axios.get(`${baseUrl}/get-all-bookings`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      log(response);
      if (response.data.errorMessage) {
        throw new Error(response.data.errorMessage);
      }
      setBookings(response.data);
    };
  };

  const handleGetAllBookings = async () => {
    try {
      setIsLoading(true);
      await dispatch(getAllBookings());
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      await dispatch(showNotificationModal(error.message));
    }
  };

  useEffect(() => {
    if (effectRan.current === false) {
      handleGetAllBookings();
      console.log("getting bookings");
      return () => {
        effectRan.current = true;
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookings]);

  // provides format  -> 7/3/2022;
  const getDateString = (stringfiedDateObject) => {
    const date = new Date(JSON.parse(stringfiedDateObject).date);
    return date.toLocaleDateString();
  };

  //provides format  -> 3:47 AM
  const getTime = (strDateObject) => {
    const date = new Date(JSON.parse(strDateObject).date);
    return date.toLocaleTimeString("en-Us", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const numberOfDays = (strDateObjOne, strDateObjTwo) => {
    const day = 1000 * 60 * 60 * 24;
    const dateOne = JSON.parse(strDateObjOne).date;
    const dateTwo = JSON.parse(strDateObjTwo).date;
    const numOfDays = (new Date(dateTwo) - new Date(dateOne)) / day;
    return Math.floor(numOfDays);
  };

  return (
    <Fragment>
      <div className={styles["get__all__booking"]}>
        {showAlertModal && <Modal isErrorMessage={isError} />}
        <div className={styles["fade__loader__container"]}>
          {isLoading && <FadeLoader />}
        </div>
        <div>
          <h4>Bookings Made</h4>
        </div>
        <div className={styles["booking__container"]}>
          <table>
            <tbody>
              <tr>
                <th style={{ marginRight: ".8em" }}>ID</th>
                <th>BookingDate</th>
                <th>GuestName </th>
                <th>NoOfGuests</th>
                <th>Room</th>
                <th>Nights</th>
                <th>Country</th>
                <th>Check-In</th>
                <th>Check-Out</th>
              </tr>
              {bookings.map((booking, index) => {
                return (
                  <tr key={index}>
                    <td style={{ paddingRight: ".5em" }}>
                      {generateBookingIdString(booking.booking_id)}
                    </td>
                    <td>
                      <span>{getDateString(booking.booking_date)}</span>{" "}
                      <span>{getTime(booking.booking_date)}</span>
                    </td>
                    <td>{booking.user_name} </td>
                    <td>{booking.no_of_guests} </td>
                    <td>{booking.room_name}</td>
                    <td>
                      {numberOfDays(
                        booking.check_in_date,
                        booking.check_out_date
                      )}
                    </td>
                    <td>{booking.country}</td>
                    <td>{getDateString(booking.check_in_date)}</td>
                    <td>{getDateString(booking.check_out_date)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default GetAllBookings;
