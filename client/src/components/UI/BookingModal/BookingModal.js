import React, { useState, Fragment } from "react";
import styles from "./BookingModal.module.scss";
import { disableEnableButton } from "../../../utils/disableEnableButton";
import { log } from "../../../utils/consoleLog";
import { RiCloseLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { bookingRoom } from "../../../store/actions/booking";
import { showNotificationModal } from "../../../store/actions/notification";
import { hideNotificationModal } from "../../../store/actions/notification";
// import Modal from "../Modal/Modal";
import { hideBookingModal } from "../../../store/actions/booking";

// TODO: fix the functionality error on the frontend

const BookingModal = ({ roomDataObject }) => {
  const [numberOfGuests, setNumberOfGuests] = useState(0);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const showAlertModal = useSelector((state) => state.notification.value);
  const bookingId = useSelector((state) => state.booking.bookingStep.bookingId);
  const [isLoading, setIsLoading] = useState(false);
  log(roomDataObject.room_name);

  const handleNumberOfGuests = (event) => {
    setNumberOfGuests(event.target.value);
  };

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
      await dispatch(showNotificationModal(error.message));
    }
  };

  return (
    <Fragment>
      <div
        className={styles["booking__modal__container"]}
        onClick={() => dispatch(hideBookingModal())}
      />
      <div className={styles["booking__modal"]}>
        <button
          className={styles["close__modal__btn"]}
          style={{ color: "black" }}
          onClick={() => dispatch(hideBookingModal())}
        >
          <RiCloseLine style={{ marginBottom: "-3px" }} />
        </button>
        <div className={styles["booking__modal__data__container"]}>
          <div className={styles["number__guest__form__container"]}>
            <div className={styles["room__name"]}>
              <p>{roomDataObject.room_name}</p>
            </div>
            <form
              className={styles["form"]}
              onSubmit={(event) =>
                handleBookRoomSubmit(event, roomDataObject.room_id)
              }
            >
              <div className={styles["form__heading"]}>
                <p>Please enter number of guests</p>
              </div>
              <div className={styles["form__input__group"]}>
                <input
                  type="number"
                  className={styles["form__input"]}
                  value={numberOfGuests}
                  onChange={(event) => handleNumberOfGuests(event)}
                  required
                />
              </div>
              <div className={styles["form__button__container"]}>
                <button
                  type="submit"
                  id="booking-btn"
                  className={styles["booking__btn"]}
                >
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
