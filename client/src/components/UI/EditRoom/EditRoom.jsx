import React, { Fragment, useState } from "react";
import ReactModal from "react-modal";
import { FadeLoader } from "react-spinners";
import { editRoom } from "../../../store/actions/room";
import { useSelector, useDispatch } from "react-redux";
import styles from "./EditRoom.module.scss";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// ReactModal.setAppElement("#yourAppElement");

const EditRoom = ({ roomObject }) => {
  const [roomName, setRoomName] = useState(roomObject.room_name);
  const [roomDescription, setRoomDescription] = useState(
    roomObject.room_description
  );
  const [noOfBeds, setNoOfBeds] = useState(roomObject.no_of_beds);
  const [price, setPrice] = useState(roomObject.price);
  const [roomCapacityNum, setRoomCapacityNum] = useState(
    roomObject.room_capacity_num
  );
  const roomId = roomObject.room_id;
  const authToken = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };
  const handleRoomDescriptionChange = (event) => {
    setRoomDescription(event.target.value);
  };
  const handleNoOfBedsChange = (event) => {
    setNoOfBeds(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  const handleRoomCapacityNumChange = (event) => {
    setRoomCapacityNum(event.target.value);
  };

  const handleUpdatedRoomDataSubmit = async (event) => {
    event.preventDefault();
    if (!roomId) return;
    try {
      setIsLoading(true);
      await dispatch(
        editRoom(
          roomId,
          roomName,
          roomDescription,
          noOfBeds,
          price,
          roomCapacityNum,
          authToken
        )
      );
      setIsLoading(false);
    } catch (error) {
      console.log("error", error.message);
      setIsLoading(false);
    }
  };

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Fragment>
      <div className={styles["edit-room"]}>
        <div className={styles["edit-room__open-modal-btn"]}>
          <button onClick={() => openModal()}>Edit</button>
        </div>
        <ReactModal
          isOpen={modalIsOpen}
          onAfterOpen={() => afterOpenModal()}
          onRequestClose={() => closeModal()}
          style={customStyles}
          ariaHideApp={false}
          contentLabel="Example Modal"
        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Edit Room</h2>
          <button
            className={styles["edit-room__close-modal-btn"]}
            onClick={() => closeModal()}
          >
            close
          </button>
          <div className={styles["edit-room__form__container"]}>
            {isLoading && (
              <div className={styles["edit-room__loader"]}>
                <FadeLoader />
                <span>Updating Room...</span>
              </div>
            )}
            <form
              className={styles["form"]}
              onSubmit={(event) => handleUpdatedRoomDataSubmit(event)}
            >
              <div className={["form__heading"]}>
                <h4>Edit Room</h4>
              </div>
              <div className={styles["form__group"]}>
                <label className={styles["form__group__label"]}>
                  Room Name
                </label>
                <input
                  className={styles["form__group__input"]}
                  type="text"
                  placeholder="Room Name"
                  value={roomName}
                  onChange={(event) => handleRoomNameChange(event)}
                  required
                />
              </div>
              <div className={styles["form__group"]}>
                <label className={styles["form__group__label"]}>
                  Room Description
                </label>
                <textarea className={styles["form__group__input"]}
                  type="text"
                  placeholder="Room Name"
                  value={roomDescription}
                  onChange={(event) => handleRoomDescriptionChange(event)}
                  required/>
                {/* <input
                  className={styles["form__group__input"]}
                  type="text"
                  placeholder="Room Name"
                  value={roomDescription}
                  onChange={(event) => handleRoomDescriptionChange(event)}
                  required
                /> */}
              </div>
              <div className={styles["form__group"]}>
                <label className={styles["form__group__label"]}>
                  Number of Beds
                </label>
                <input
                  className={styles["form__group__input"]}
                  type="number"
                  placeholder="Number of beds"
                  value={noOfBeds}
                  onChange={(event) => handleNoOfBedsChange(event)}
                  required
                />
              </div>
              <div className={styles["form__group"]}>
                <label className={styles["form__group__label"]}>Price</label>
                <input
                  className={styles["form__group__input"]}
                  type="number"
                  placeholder="Room price"
                  value={price}
                  onChange={(event) => handlePriceChange(event)}
                  required
                />
              </div>
              <div className={styles["form__group"]}>
                <label className={styles["form__group__label"]}>
                  Room Capacity Number
                </label>
                <input
                  className={styles["form__group__input"]}
                  type="number"
                  placeholder="Room capacity number"
                  value={roomCapacityNum}
                  onChange={(event) => handleRoomCapacityNumChange(event)}
                  required
                />
              </div>
              <div className={styles["form__btn__container"]}>
                <button type="submit" className={styles["btn"]}>
                  Update
                </button>
              </div>
            </form>
          </div>
        </ReactModal>
      </div>
    </Fragment>
  );
};

export default EditRoom;
