import React, { useState, Fragment } from "react";
import styles from "./BookingModal.module.scss";
import { disableEnableButton } from "../../../utils/disableEnableButton";
import { log } from "../../../utils/consoleLog";
import { RiCloseLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { bookingRoom } from "../../../store/actions/booking";
import { showNotificationModal as showBookingModal } from "../../../store/actions/notification";
// import { hideNotificationModal as hideBookingModal } from "../../../store/actions/notification";
import { hideNotificationModal } from "../../../store/actions/notification";
// import Modal from "../Modal/Modal";
import { hideBookingModal } from "../../../store/actions/booking";

const BookingModal = ({ roomDataObject }) => {
  const [numberOfGuests, setNumberOfGuests] = useState(0);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const showAlertModal = useSelector((state) => state.notification.value);
  const bookingId = useSelector((state) => state.booking.bookingStep.bookingId);
  const [isLoading, setIsLoading] = useState(false);

  const handleNumberOfGuests = (event) => {
    setNumberOfGuests(event.target.value);
  };
  // TODO: pass room here as props
  // api request
  // handle submit

  const handleBookRoomSubmit = async (event, roomId) => {
    event.preventDefault();
    if (!bookingId || !token) return;
    try {
      setIsLoading(true);
      disableEnableButton("booking-btn", true);
      await dispatch(bookingRoom(bookingId, token, roomId, numberOfGuests));
      setIsLoading(false);
      disableEnableButton("booking-btn", false);
    } catch (error) {
      setIsLoading(false);
      disableEnableButton("booking-btn", false);
      await dispatch(showBookingModal(error.message));
    }
  };

  return (
    <Fragment>
      <div
        className={styles["booking__modal__container"]}
        // onClick={() => dispatch(hideBookingModal())}
        onClick={() => dispatch(hideBookingModal())}
      />
      <div className={styles["booking__modal"]}>
        <button
          className={styles["close__modal__btn"]}
          style={{ color: "black" }}
          // onClick={() => dispatch(hideBookingModal())}
          onClick={() => dispatch(hideBookingModal())}
        >
          <RiCloseLine style={{ marginBottom: "-3px" }} />
        </button>
        {/* <p className={styles["message__container"]}>
          <span
            className={styles["empty__span"]}
            style={{ backgroundColor: isErrorMessage ? "red" : "green" }}
          ></span>
          <span
            className={styles["message"]}
            style={{ color: isErrorMessage ? "red" : "green" }}
          >
            {notificationMessage}
          </span>
        </p> */}
        <div className={styles["booking__modal__data__container"]}>
          <div className={styles["number__guest__form__container"]}>
            <div className={styles["room__to__be__booked"]}>
              <span>{roomDataObject.room_name}</span>
            </div>
            <div className={styles["heading"]}>
              <span>Please number of guests</span>
            </div>
            <form
              className={styles["form"]}
              onSubmit={(event) =>
                handleBookRoomSubmit(event, roomDataObject.room_id)
              }
            >
              <div className={styles["form__input__group"]}>
                <input
                  type="number"
                  className={styles["form__input"]}
                  value={numberOfGuests}
                  onChange={(event) => handleNumberOfGuests(event)}
                />
              </div>
              <div className={styles["form__button__container"]}>
                <button type="submit" id="booking-btn">
                  Book
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BookingModal;
