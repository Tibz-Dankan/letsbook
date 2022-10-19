import React, { Fragment, useEffect, useState } from "react";
import styles from "./Booking.module.scss";
import BookingDates from "../../components/UI/BookingDates/BookingDates";
import { useDispatch, useSelector } from "react-redux";
import { bookingActions } from "../../store/reducers/booking";
import BookRoom from "../../components/UI/BookRoom/BookRoom";
import MyBooking from "../../components/UI/MyBooking/MyBooking";
import { bookingProcess } from "../../store/actions/booking";
import { hideAllBookingComponents } from "../../store/actions/booking";
import { log } from "../../utils/consoleLog";
import { NavLink } from "react-router-dom";

const Booking = () => {
  const dispatch = useDispatch();
  const bookingStep = useSelector((state) => state.booking.bookingStep.step);
  log("booking step: " + bookingStep);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [showDatesBooking, setShowDatesBooking] = useState(false);
  const [showBookingMade, setShowBookingMade] = useState(false);

  const showBookingDatesComponent = useSelector(
    (state) => state.booking.showBookingDatesComponent
  );
  const showBookRoomComponent = useSelector(
    (state) => state.booking.showBookRoomComponent
  );
  const showMyBookingComponent = useSelector(
    (state) => state.booking.showMyBookingComponent
  );

  const bookingStepFromStorage = JSON.parse(
    localStorage.getItem("bookingStep")
  );

  const bookingIdFromStorage =
    bookingStepFromStorage && bookingStepFromStorage.bookingStep.bookingId;

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

  // useEffect(() => {
  //   dispatch(bookingProcess(bookingStep, bookingId));
  //   console.log("booking process in useEffect");
  // }, [dispatch, bookingStep, bookingId]);

  // show Booking dates component component
  const showBookingDatesComp = async () => {
    await dispatch(hideAllBookingComponents());
    await dispatch(bookingProcess(1, bookingIdFromStorage));
    setShowDatesBooking(true);
    setShowBookingMade(false);
  };
  // show MyBooking  component
  const showMyBookingComp = async () => {
    await dispatch(hideAllBookingComponents());
    await dispatch(bookingProcess(3, bookingIdFromStorage));
    setShowBookingMade(true);
    setShowDatesBooking(false);
  };

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
                onClick={() => showBookingDatesComp()}
              >
                {/* <span>Make Booking</span> */}
                <span>Book Now</span>
              </NavLink>
            </li>
            <li
              className={styles["booking__header__list--item"]}
              id="booking-step-3"
            >
              <NavLink
                to="/booking"
                className={styles["booking__header__list--item--link"]}
                onClick={() => showMyBookingComp()}
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
          {/* {bookingStep === 1 && <BookingDates />} */}
          {/* {bookingStep === 2 && <BookRoom />} */}
          {/* {bookingStep === 3 && <MyBooking />} */}
          {showBookingDatesComponent && <BookingDates />}
          {showBookRoomComponent && <BookRoom />}
          {showMyBookingComponent && <MyBooking />}
          {/* show on nav link click */}
          {showDatesBooking && <BookingDates />}
          {showBookingMade && <MyBooking />}
        </div>
      </div>
    </Fragment>
  );
};

export default Booking;
