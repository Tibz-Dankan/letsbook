import React, { Fragment, useState } from "react";
import { baseUrl } from "../../../store/appStore";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { showNotificationModal } from "../../../store/actions/notification";
import { FadeLoader } from "react-spinners";
import Modal from "../Modal/Modal";
import styles from "./AddRoom.module.scss";
import { log } from "../../../utils/consoleLog";
import { disableEnableButton } from "../../../utils/disableEnableButton";

const AddRoom = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [roomDescription, setRoomDescription] = useState("");
  const [numberOfBeds, setNumberOfBeds] = useState(undefined);
  const [roomPrice, setRoomPrice] = useState(undefined);
  const [roomPicture, setRoomPicture] = useState("null");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const showModal = useSelector((state) => state.notification.value);

  const handleRoomDescription = (event) => {
    setRoomDescription(event.target.value);
  };
  const handleNumberOfBeds = (event) => {
    setNumberOfBeds(event.target.value);
  };
  const handleRoomPrice = (event) => {
    setRoomPrice(event.target.value);
  };

  const requestBodyData = () => {
    return {
      roomDescription: roomDescription,
      numberOfBeds: numberOfBeds,
      roomPrice: roomPrice,
      roomPicture: roomPicture,
    };
  };

  const addRoom = () => {
    return async (dispatch) => {
      const response = await axios.post(
        `${baseUrl}/add-room`,
        requestBodyData(),
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
      await dispatch(showNotificationModal("Room added successfully"));
    };
  };

  const handleAddRoomSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      disableEnableButton("add-room-btn", true);
      await dispatch(addRoom());
      setIsLoading(false);
      disableEnableButton("add-room-btn", false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      await dispatch(showNotificationModal(error.message));
      disableEnableButton("add-room-btn", false);
    }
  };

  return (
    <Fragment>
      <div className={styles["add__room__container"]}>
        {showModal && <Modal isErrorMessage={isError} />}
        <div className={styles["fade__loader__container"]}>
          {isLoading && <FadeLoader />}
        </div>
        <div className={styles["form__container"]}>
          <form
            className={styles["form"]}
            onSubmit={(event) => handleAddRoomSubmit(event)}
          >
            <div className={styles["form__input__group"]}>
              <label htmlFor="room description">Room Description</label>
              <textarea
                type="text"
                value={roomDescription}
                onChange={(event) => handleRoomDescription(event)}
                placeholder="Room Description"
                className={styles["form__input__field"]}
                required
              />
            </div>
            <div className={styles["form__input__group"]}>
              <label htmlFor="number of beds">Number Of Beds</label>
              <input
                type="number"
                value={numberOfBeds}
                onChange={(event) => handleNumberOfBeds(event)}
                placeholder="Number Of Beds"
                className={styles["form__input__field"]}
                required
              />
            </div>
            <div className={styles["form__input__group"]}>
              <label htmlFor="room price">Room Price</label>
              <input
                type="number"
                value={roomPrice}
                onChange={(event) => handleRoomPrice(event)}
                placeholder="Room Price"
                className={styles["form__input__field"]}
                required
              />
            </div>
            <div className={styles["form__input__group"]}>
              <label htmlFor="room picture">Room Picture</label>
              <input
                type="file"
                // value={roomPicture}
                onChange={(event) => setRoomPicture(event.target.value)}
                placeholder="Room Picture"
                className={styles["form__input__field"]}
                disabled
              />
            </div>
            <div className={styles["form__btn__container"]}>
              <button
                type="submit"
                id="add-room-btn"
                className={styles["form__btn"]}
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default AddRoom;
