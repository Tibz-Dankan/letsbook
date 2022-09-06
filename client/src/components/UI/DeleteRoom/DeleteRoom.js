import React, { Fragment, useState } from "react";
import ReactModal from "react-modal";
import { FadeLoader } from "react-spinners";
import { useSelector, useDispatch } from "react-redux";
import { deleteRoom } from "../../../store/actions/room";
import styles from "./DeleteRoom.module.scss";

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

const DeleteRoom = ({ roomObject }) => {
  const roomId = roomObject.room_id;
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.token);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleDeleteRoom = async () => {
    if (!roomId) return;
    console.log("roomId in handler :" + roomId);
    try {
      setIsLoading(true);
      await dispatch(deleteRoom(roomId, authToken));
      setIsLoading(false);
    } catch (error) {
      console.log("error", error.message);
      setIsLoading(false);
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
            Delete
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
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Delete Room</h2>
          <button
            className={styles["delete-room__close-modal-btn"]}
            onClick={() => closeModal()}
          >
            close
          </button>
          <div className={styles["delete-room__group"]}>
            {isLoading && (
              <div className={styles["delete-room__loader"]}>
                <FadeLoader />
                <span>Deleting room..</span>
              </div>
            )}
            <div className={styles["delete-room__heading"]}>
              <h4>
                Are sure that you <b>Delete</b>{" "}
                <span>{roomObject.room_name}</span>
              </h4>
            </div>
            <div className={styles["delete-room__btn__container"]}>
              <button
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
