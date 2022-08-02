import React, { Fragment } from "react";
import styles from "./Booking.module.scss";
import BookingDates from "../../components/UI/BookingDates/BookingDates";
import { useDispatch, useSelector } from "react-redux";
import { bookingActions } from "../../store/reducers/booking";
import BookRoom from "../../components/UI/BookRoom/BookRoom";
import MyBooking from "../../components/UI/MyBooking/MyBooking";
import GeneralHeader from "../../components/layouts/GeneralHeader/GeneralHeader";
import Footer from "../../components/layouts/Footer/Footer";
import { log } from "../../utils/consoleLog";

const Booking = () => {
  const dispatch = useDispatch();
  const bookingStep = useSelector((state) => state.booking.bookingStep.step);
  log("booking step: " + bookingStep);

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

  return (
    <Fragment>
      <div className={styles["booking__container"]}>
        <GeneralHeader currentPage={"Booking"} />
        {bookingStep === 1 && <BookingDates />}
        {bookingStep === 2 && <BookRoom />}
        {bookingStep === 3 && <MyBooking />}
        <Footer />
      </div>
    </Fragment>
  );
};

export default Booking;
