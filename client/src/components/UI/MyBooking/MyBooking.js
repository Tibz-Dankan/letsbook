import React, { Fragment } from "react";
import styles from "./MyBooking.module.scss";

const MyBooking = () => {
  // TODO: list all my booking with their details
  //   Each booking details include the following
  // date when booking made
  // checkIn and checkOut date
  // payment status, show receipts if paid

  //   TODO: Another component (CancelBooking) , api end point for cancelling the booking
  return (
    <Fragment>
      <div className={styles["my__booking__container"]}>MyBooking</div>
    </Fragment>
  );
};

export default MyBooking;
