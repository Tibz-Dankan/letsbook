import React, { useEffect, useState, useRef, Fragment } from "react";
import axios from "axios";
import { baseUrl } from "../../../store/appStore";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { showNotificationModal } from "../../../store/actions/notification";
// import { bookingProcess } from "../../../store/actions/booking";
import roomPhoto from "../../../assets/room1.jpeg";
// import bookedRoomPhoto from "../../../assets/booked-room1.jpeg";

import { FadeLoader } from "react-spinners";
import { log } from "../../../utils/consoleLog";
import Modal from "../Modal/Modal";
import styles from "./BookRoom.module.scss";
// import { GiMushroomHouse } from "react-icons/gi";
// import { MdOutlineBedroomParent } from "react-icons/md";
// import { IconContext } from "react-icons";
import BookingModal from "../BookingModal/BookingModal";

const BookRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const effectRan = useRef(false);
  const dispatch = useDispatch();
  const showAlertModal = useSelector((state) => state.notification.value);
  const token = useSelector((state) => state.auth.token);
  // const bookingStep = useSelector((state) => state.booking.bookingStep.step);
  const bookingId = useSelector((state) => state.booking.bookingStep.bookingId);

  console.log("Booking Id from the redux store:" + bookingId);

  // useEffect(() => {
  //   dispatch(bookingProcess(bookingStep, bookingId));
  //   console.log("booking room dispatch  in useEffect");
  // }, [dispatch, bookingStep, bookingId]);

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
    // if (!bookingId) return;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rooms]);

  return (
    <Fragment>
      <div className={styles["rooms__container"]}>
        {showAlertModal && <Modal isErrorMessage={isError} />}
        <div className={styles["booking__heading"]}>
          <span> Step 2: Book a room of your choice</span>
        </div>
        {isLoading && (
          <div className={styles["fade__loader__container"]}>
            <FadeLoader
              color="hsl(266, 50%, 36%)"
              className={styles["spinner"]}
            />
            <span>Fetching rooms...</span>
          </div>
        )}
        <div className={styles["rooms"]}>
          {rooms.map((room, index) => {
            return (
              <div
                key={index}
                className={styles["rooms__inner__container"]}
                id={styles["room__container"]}
              >
                {room.room_image_url ? (
                  <div className={styles["rooms__image__container"]}>
                    <img
                      src={room.room_image_url}
                      alt="Room"
                      className={styles["rooms__image"]}
                    />
                  </div>
                ) : (
                  <img
                    src={roomPhoto}
                    alt="Room"
                    className={styles["rooms__image"]}
                    style={{
                      width: "100%",
                      height: "235px",
                      objectFit: "cover",
                    }}
                  />
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
                <div className={styles["booking__modal__container"]}>
                  {/* Modal to capture number of guests */}
                  <BookingModal roomDataObject={room} />
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
