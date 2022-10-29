import React, { Fragment, useState } from "react";
import ReactModal from "react-modal";
import UploadImage from "../UploadImage/UploadImage";
import { RiCloseLine } from "react-icons/ri";

import styles from "./UpdateRoomImage.module.scss";

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

const UpdateRoomImage = ({ roomDataObject }) => {
  console.log(roomDataObject);

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
  return (
    <Fragment>
      <div className={styles["update__room__image"]}>
        <div className={styles["update__room__image--open-modal"]}>
          <button onClick={() => openModal()}>Update Room Image</button>
        </div>
        <ReactModal
          isOpen={modalIsOpen}
          onAfterOpen={() => afterOpenModal()}
          onRequestClose={() => closeModal()}
          style={customStyles}
          ariaHideApp={false}
          contentLabel="Example Modal"
        >
          <div className={styles["update__room__image--room-data"]}>
            <button
              className={
                styles["update__room__image--room-data-close-modal-btn"]
              }
              onClick={() => closeModal()}
            >
              <RiCloseLine />
            </button>
            <span className={styles["update__room__image--room-data-heading"]}>
              Please Note You Are Updating {roomDataObject.room_name} Image
            </span>
            <div className={styles["update__room__image--room-data-upload"]}>
              <UploadImage
                apiEndpoint={"upload-room-image"}
                id={roomDataObject.room_id}
                category={"Room"}
              />
            </div>
          </div>
        </ReactModal>
      </div>
    </Fragment>
  );
};

export default UpdateRoomImage;
