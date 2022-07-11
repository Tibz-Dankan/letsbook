import React, { useEffect, useState, useRef, Fragment } from "react";
import axios from "axios";
import { baseUrl } from "../../../store/appStore";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { notificationActions } from "../../../store/reducers/notification";
import { showNotificationModal } from "../../../store/actions/notification";
import { bookingRoom } from "../../../store/actions/booking";
import { FadeLoader } from "react-spinners";
import { log } from "../../../utils/consoleLog";
import { disableEnableButton } from "../../../utils/disableEnableButton";
import Modal from "../Modal/Modal";
import styles from "./BookRoom.module.scss";

const BookRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const effectRan = useRef(false);
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.notification.value);
  const token = useSelector((state) => state.auth.token);
  const bookingId = useSelector((state) => state.booking.bookingStep.bookingId);
  console.log(bookingId);

  const getUnbookedRooms = () => {
    return async (dispatch) => {
      const response = await axios.get(
        `${baseUrl}/get-unbooked-rooms/${bookingId}`,
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
      setRooms(response.data);
    };
  };

  const getRooms = async () => {
    if (!bookingId) return;
    try {
      setIsLoading(true);
      await dispatch(getUnbookedRooms());
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      await dispatch(showNotificationModal(error.message));
    }
  };

  useEffect(() => {
    if (effectRan.current === false) {
      getRooms();
      log("getting rooms");
      return () => {
        effectRan.current = true;
      };
    }
  }, [rooms]);

  const bookRoom = async (roomId) => {
    if (!bookingId) return;
    try {
      setIsLoading(true);
      disableEnableButton("booking-btn", true);
      await dispatch(bookingRoom(bookingId, roomId, token));
      setIsLoading(false);
      disableEnableButton("booking-btn", false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      disableEnableButton("booking-btn", false);
      await dispatch(showNotificationModal(error.message));
    }
  };

  return (
    <Fragment>
      <div className={styles["rooms__container"]}>
        {showModal && <Modal isErrorMessage={isError} />}
        <div className={styles["fade__loader__container"]}>
          {isLoading && <FadeLoader />}
        </div>
        <div className={styles["rooms"]}>
          {rooms.map((room) => {
            return (
              <div key={room.room_id}>
                <div className={styles["rooms__number"]}>No.{room.room_id}</div>
                {/* image icon incase of no image */}
                <div className={styles["rooms__image"]}>{room.image_url}</div>
                <div className={styles["rooms__description"]}>
                  {room.room_description}
                </div>
                <div className={styles["rooms__no__beds"]}>
                  {room.no_of_beds}
                </div>
                <div className={styles["rooms__price"]}>{room.price}</div>
                <div className={styles["booking__btn__container"]}>
                  <button
                    id="booking-btn"
                    className={styles["booking__btn"]}
                    onClick={() => bookRoom(room.room_id)}
                  >
                    Book
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default BookRoom;
