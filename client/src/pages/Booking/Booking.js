import React, { Fragment, useEffect } from "react";
import styles from "./Booking.module.scss";
import BookingDates from "../../components/UI/BookingDates/BookingDates";
import { useDispatch, useSelector } from "react-redux";
import { bookingActions } from "../../store/reducers/booking";
import BookRoom from "../../components/UI/BookRoom/BookRoom";
import MyBooking from "../../components/UI/MyBooking/MyBooking";
import { bookingProcess } from "../../store/actions/booking";
import { log } from "../../utils/consoleLog";
import { NavLink, Navigate } from "react-router-dom";

const Booking = () => {
  const dispatch = useDispatch();
  const bookingStep = useSelector((state) => state.booking.bookingStep.step);
  log("booking step: " + bookingStep);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const bookingStepFromStorage = JSON.parse(
    localStorage.getItem("bookingStep")
  );
  const navigationTypeReload =
    performance.getEntriesByType("navigation")[0].type === "reload";

  // update redux store with the date and current step number on reload
  if (navigationTypeReload && bookingStepFromStorage) {
    dispatch(
      bookingActions.bookingProcess({
        bookingStep: bookingStepFromStorage.bookingStep,
      })
    );
  }

  // const handleBookingStep = async (bookingStepNum, bookingId) => {
  //   await dispatch(bookingProcess(bookingStepNum, bookingId));
  // };

  useEffect(() => {
    const setBackgroundColor = () => {
      const elementOne =
        isLoggedIn && document.getElementById("booking-step-1");
      const elementThree =
        isLoggedIn && document.getElementById("booking-step-3");
      switch (bookingStep) {
        case 1:
          elementOne.style.backgroundColor = "hsl(0, 0%, 100%)";
          elementThree.style.backgroundColor = "";
          break;
        case 3:
          elementThree.style.backgroundColor = "hsl(0, 0%, 100%)";
          elementOne.style.backgroundColor = "";
          break;
        default:
          elementOne.style.backgroundColor = "hsl(0, 0%, 100%)";
      }
    };
    setBackgroundColor();
  }, [bookingStep, isLoggedIn]);

  return (
    <Fragment>
      <div className={styles["booking"]}>
        <div className={styles["booking__header"]}>
          <ul className={styles["booking__header__list"]}>
            <li
              className={styles["booking__header__list--item"]}
              id="booking-step-1"
            >
              <NavLink
                to="/booking"
                className={styles["booking__header__list--item--link"]}
                // onClick={() => handleBookingStep(1, null)}
                onClick={() => dispatch(bookingProcess(1, null))}
              >
                <span>Make Booking</span>
              </NavLink>
            </li>
            <li
              className={styles["booking__header__list--item"]}
              id="booking-step-3"
            >
              <NavLink
                to="/booking"
                className={styles["booking__header__list--item--link"]}
                // onClick={() => handleBookingStep(3, null)}
                onClick={() => dispatch(bookingProcess(3, null))}
              >
                <span>My Booking</span>
              </NavLink>
            </li>
            <li className={styles["booking__header__list--item"]}>
              <NavLink
                to="/chat"
                className={styles["booking__header__list--item--link"]}
              >
                <span>Chat</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className={styles["booking__components"]}>
          {bookingStep === 1 && <BookingDates />}
          {bookingStep === 2 && <BookRoom />}
          {bookingStep === 3 && <MyBooking />}
        </div>
      </div>
    </Fragment>
  );
};

export default Booking;
