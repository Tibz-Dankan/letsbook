import React, { Fragment, useState } from "react";
import styles from "./BookingDates.module.scss";
import { disableEnableButton } from "../../../utils/disableEnableButton";
import { FadeLoader } from "react-spinners";
import { submitBookingDates } from "../../../store/actions/booking";
import { showNotificationModal } from "../../../store/actions/notification";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal/Modal";

const BookingDates = () => {
  const [isError, setIsError] = useState(false);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.userId);
  console.log(userId);
  const authToken = useSelector((state) => state.auth.token);
  const showAlertModal = useSelector((state) => state.notification.value);

  const handleCheckInDate = (event) => {
    setCheckInDate(event.target.value);
  };

  const handleCheckOutDate = (event) => {
    setCheckOutDate(event.target.value);
  };

  // TODO: validate dates

  const handleSubmitDate = async (event) => {
    event.preventDefault();
    if (!userId) return;
    try {
      setIsLoading(true);
      disableEnableButton("date-btn", true);
      await dispatch(
        submitBookingDates(checkInDate, checkOutDate, userId, authToken)
      );
      setIsLoading(false);
      disableEnableButton("date-btn", false);
    } catch (error) {
      setIsLoading(false);
      disableEnableButton("date-btn", false);
      setIsError(true);
      await dispatch(showNotificationModal(error.message));
    }
  };

  return (
    <Fragment>
      <div className={styles["booking__dates__container"]}>
        {showAlertModal && <Modal isErrorMessage={isError} />}
        <div className={styles["booking__heading"]}>
          <span> Step 1: Select your booking dates</span>
        </div>
        {isLoading && (
          <div className={styles["fade__loader__container"]}>
            <FadeLoader
              color="hsl(266, 50%, 36%)"
              className={styles["spinner"]}
            />
            <span>Submitting...</span>
          </div>
        )}
        <form
          className={styles["form"]}
          onSubmit={(event) => handleSubmitDate(event)}
        >
          <div className={styles["form__group__input"]}>
            <label htmlFor="check-in-date" className={styles["label"]}>
              Check In date
            </label>
            <input
              type="date"
              value={checkInDate}
              className={styles["form__input"]}
              onChange={(event) => handleCheckInDate(event)}
              required
            />
          </div>
          <div className={styles["form__group__input"]}>
            <label htmlFor="check-out-date" className={styles["label"]}>
              Check Out date
            </label>
            <input
              type="date"
              value={checkOutDate}
              className={styles["form__input"]}
              onChange={(event) => handleCheckOutDate(event)}
              required
            />
          </div>
          <div className={styles["form__btn__container"]}>
            <button id="date-btn" type="submit" className={styles["form__btn"]}>
              Continue
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default BookingDates;
