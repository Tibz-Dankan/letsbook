import React, { Fragment, useState } from "react";
import ReactModal from "react-modal";
import { FadeLoader } from "react-spinners";
import { useSelector, useDispatch } from "react-redux";
import { deleteRoom } from "../../../store/actions/room";
import { RiCloseLine } from "react-icons/ri";
import { disableEnableButton } from "../../../utils/disableEnableButton";
import styles from "./DeleteRoom.module.scss";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "lightgrey",
  },
};

// ReactModal.setAppElement("#yourAppElement");

const DeleteRoom = ({ roomDataObject }) => {
  const roomId = roomDataObject.room_id;
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.token);
  const [isLoading, setIsLoading] = useState(false);

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleDeleteRoom = async () => {
    if (!roomId) return;
    console.log("roomId in handler :" + roomId);
    try {
      setIsLoading(true);
      disableEnableButton("delete-btn", true);
      await dispatch(deleteRoom(roomId, authToken));
      setIsLoading(false);
      disableEnableButton("delete-btn", false);
    } catch (error) {
      console.log("error", error.message);
      setIsLoading(false);
      disableEnableButton("delete-btn", false);
    }
  };

  return (
    <Fragment>
      <div className={styles["delete-room"]}>
        <div className={styles["delete-room__open-modal"]}>
          <button
            className={styles["delete-room__open-modal__btn"]}
            onClick={() => openModal()}
          >
            Delete Room
          </button>
        </div>
        <ReactModal
          isOpen={modalIsOpen}
          onAfterOpen={() => afterOpenModal()}
          onRequestClose={() => closeModal()}
          style={customStyles}
          ariaHideApp={false}
          contentLabel="Delete Room"
        >
          <div className={styles["delete-room__group"]}>
            <button
              className={styles["delete-room__group__close-modal-btn"]}
              onClick={() => closeModal()}
            >
              <RiCloseLine />
            </button>
            {isLoading && (
              <div className={styles["delete-room__group__loader"]}>
                <FadeLoader color="hsl(0, 100%, 60%)" />
                <span>Deleting room..</span>
              </div>
            )}
            <div className={styles["delete-room__group__heading"]}>
              <p>
                Are sure that you <b>Delete</b>{" "}
                <span>{roomDataObject.room_name} ?</span>
              </p>
            </div>
            <div className={styles["delete-room__group__btn__container"]}>
              <button
                id="delete-btn"
                className={styles["btn"]}
                onClick={() => handleDeleteRoom()}
              >
                DELETE
              </button>
            </div>
          </div>
        </ReactModal>
      </div>
    </Fragment>
  );
};

export default DeleteRoom;
