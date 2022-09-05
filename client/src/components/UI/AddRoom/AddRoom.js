import React, { Fragment, useState } from "react";
import { baseUrl } from "../../../store/appStore";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { showNotificationModal } from "../../../store/actions/notification";
import { FadeLoader } from "react-spinners";
import Modal from "../Modal/Modal";
// import UploadImage from "../UploadImage/UploadImage";
// import ImagePicker from "../ImagePicker/ImagePicker";
import styles from "./AddRoom.module.scss";
import { log } from "../../../utils/consoleLog";
import { disableEnableButton } from "../../../utils/disableEnableButton";

const AddRoom = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [numberOfBeds, setNumberOfBeds] = useState(undefined);
  const [roomPrice, setRoomPrice] = useState(undefined);
  // const [roomPhoto, setRoomPhoto] = useState("");
  let roomPhoto;
  const [roomId, setRoomId] = useState("");
  // const [isRoomAddedSuccessfully, setIsRoomAddedSuccessfully] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const showModal = useSelector((state) => state.notification.value);

  const handleRoomName = (event) => {
    setRoomName(event.target.value);
  };

  const handleRoomDescription = (event) => {
    setRoomDescription(event.target.value);
  };
  const handleNumberOfBeds = (event) => {
    setNumberOfBeds(event.target.value);
  };
  const handleRoomPrice = (event) => {
    setRoomPrice(event.target.value);
  };

  // const onSelectRoomPhoto = (photo) => {
  //   // setRoomPhoto(photo);
  //   roomPhoto = photo;
  // };

  console.log(roomPhoto);

  // TODO:consider using useEffect hook to monitor whether something is loading or not;

  const requestBodyData = () => {
    return {
      roomDescription: roomDescription,
      numberOfBeds: numberOfBeds,
      roomPrice: roomPrice,
      roomPicture: roomPhoto,
      roomName: roomName,
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
      setRoomId(response.data.roomId);
      await dispatch(showNotificationModal("Room added successfully"));
      console.log(roomId);
    };
  };

  const handleAddRoomSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      disableEnableButton("add-room-btn", true);
      await dispatch(addRoom());
      setIsLoading(false);
      // setIsRoomAddedSuccessfully(true);
      disableEnableButton("add-room-btn", false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      await dispatch(showNotificationModal(error.message));
      disableEnableButton("add-room-btn", false);
    }
  };

  // const uploadRoomImage = () => {
  //   return async (dispatch) => {
  //     let formData = new FormData();
  //     formData.append("file", roomPhoto.data);

  //     const response = await axios.post(
  //       `${baseUrl}/upload-room-image/${roomId}`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: "Bearer " + token,
  //         },
  //       }
  //     );
  //     log(response);
  //     if (response.data.errorMessage) {
  //       throw new Error(response.data.errorMessage);
  //     }
  //     await dispatch(showNotificationModal("Image upload successful"));
  //   };
  // };

  // // handle room image upload
  // const handleRoomImageUpload = async (event) => {
  //   event.preventDefault();
  //   try {
  //     setIsLoading(true);
  //     disableEnableButton("room-image-upload-btn", true);
  //     await dispatch(uploadRoomImage());
  //     setIsLoading(false);
  //     disableEnableButton("room-image-upload-btn", false);
  //   } catch (error) {
  //     setIsLoading(false);
  //     setIsError(true);
  //     await dispatch(showNotificationModal(error.message));
  //     disableEnableButton("room-image-upload", false);
  //   }
  // };

  return (
    <Fragment>
      <div className={styles["add-room"]}>
        {showModal && <Modal isErrorMessage={isError} />}
        <div className={styles["add-room__spinner"]}>
          {isLoading && <FadeLoader />}
        </div>
        {/* {!isRoomAddedSuccessfully && ( */}
        <div className={styles["add-room__container"]}>
          <form
            className={styles["form"]}
            onSubmit={(event) => handleAddRoomSubmit(event)}
          >
            <div className={styles["form__input__group"]}>
              <label htmlFor="room name">Room name</label>
              <input
                type="text"
                value={roomName}
                onChange={(event) => handleRoomName(event)}
                placeholder="Room name"
                className={styles["form__input__field"]}
                required
              />
            </div>
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
            <div className={styles["form__btn__container"]}>
              <button type="submit" id="add-room-btn" className={styles["btn"]}>
                Add
              </button>
            </div>
          </form>
        </div>
        {/* )} */}
        {/* {isRoomAddedSuccessfully && (
          <div className={styles["add-room__image__upload"]}>
            <UploadImage />
            <ImagePicker onSelect={onSelectRoomPhoto} />
            {roomPhoto.preview && (
              <form
                onSubmit={(event) => handleRoomImageUpload(event)}
                className={styles["add-room__image__upload__form"]}
              >
                 TODO: consider adding upload icon to the button 
                <button
                  type="submit"
                  id="room-image-upload-btn"
                  className={styles["btn"]}
                >
                  Upload
                </button>
              </form>
            )}
          </div>
        )} */}
      </div>
    </Fragment>
  );
};

export default AddRoom;
