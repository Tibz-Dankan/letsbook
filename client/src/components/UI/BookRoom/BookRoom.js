import React, { useEffect, useState, useRef, Fragment } from "react";
import axios from "axios";
import { baseUrl } from "../../../store/appStore";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { showNotificationModal } from "../../../store/actions/notification";
import { bookingRoom } from "../../../store/actions/booking";
import { FadeLoader } from "react-spinners";
import { log } from "../../../utils/consoleLog";
import { disableEnableButton } from "../../../utils/disableEnableButton";
import { showBookingModal } from "../../../store/actions/booking";
import Modal from "../Modal/Modal";
import styles from "./BookRoom.module.scss";
import { GiMushroomHouse } from "react-icons/gi";
import { IconContext } from "react-icons";
import BookingModal from "../BookingModal/BookingModal";

const BookRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const effectRan = useRef(false);
  const dispatch = useDispatch();
  const showAlertModal = useSelector((state) => state.notification.value);
  const openBookingModal = useSelector((state) => state.booking.value);
  const token = useSelector((state) => state.auth.token);
  const bookingId = useSelector((state) => state.booking.bookingStep.bookingId);

  // TODO: perfect the algorithm for fetching the rooms on the backend
  const getUnbookedRooms = () => {
    return async () => {
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
    if (!bookingId || !token) return;
    try {
      setIsLoading(true);
      disableEnableButton("booking-btn", true);
      await dispatch(bookingRoom(bookingId, token, roomId));
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
        {showAlertModal && <Modal isErrorMessage={isError} />}
        <div className={styles["fade__loader__container"]}>
          {isLoading && <FadeLoader />}
        </div>
        <div className={styles["booking__heading"]}>
          <span> Step 2: Book a room of your choice</span>
        </div>
        <div className={styles["rooms"]}>
          {rooms.map((room, index) => {
            return (
              <div key={index} className={styles["rooms__inner__container"]}>
                {room.room_image_url ? (
                  <div className={styles["rooms__image__container"]}>
                    <img
                      src={room.image_url}
                      alt="Room Image"
                      className={styles["rooms__image"]}
                    />
                  </div>
                ) : (
                  <IconContext.Provider
                    value={{
                      color: "hsl(206, 50%, 70%)",
                      className: styles["room__icon__container"],
                      size: "8em",
                    }}
                  >
                    <GiMushroomHouse />
                  </IconContext.Provider>
                )}
                <div className={styles["room__name"]}>{room.room_name}</div>
                <div className={styles["rooms__price"]}>
                  <span>
                    <span>${room.price} USD</span> per night
                  </span>
                </div>
                <div className={styles["rooms__description"]}>
                  {room.room_description}
                </div>
                <div className={styles["booking__btn__container"]}>
                  <button
                    id="booking-btn"
                    className={styles["booking__btn"]}
                    // onClick={() => bookRoom(room.room_id)}
                    onClick={() => dispatch(showBookingModal())}
                  >
                    Book
                  </button>
                  {openBookingModal && <BookingModal roomDataObject={room} />}
                  {/*TODO: TO BE PERFECTED*/}
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
