import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import ReactModal from "react-modal";
import { RiCloseLine } from "react-icons/ri";
import styles from "./NotLoggedIn.module.scss";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "hsl(0, 8%, 98%)",
    border: "hsl(0, 8%, 95%)",
    boxShadow:
      "2px 4px 6px 2px hsla(0, 0%, 0%, 0.08), -2px -2px 6px 2px hsla(0, 0%, 0%, 0.08)",
  },
};

const NotLoggedIn = () => {
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
      <div className={styles["not-logged"]}>
        <div className={styles["not-logged__open-modal"]}>
          <button
            className={styles["not-logged__open-modal__btn"]}
            onClick={() => openModal()}
          >
            Book
          </button>
        </div>
        <ReactModal
          isOpen={modalIsOpen}
          onAfterOpen={() => afterOpenModal()}
          onRequestClose={() => closeModal()}
          style={customStyles}
          ariaHideApp={false}
          contentLabel="LogIn To Continue"
        >
          <div className={styles["not-logged__content"]}>
            <button
              className={styles["not-logged__content__close-modal-btn"]}
              onClick={() => closeModal()}
            >
              <RiCloseLine />
            </button>
            <span className={styles["not-logged__content__msg"]}>
              Please log into your account to make a booking
            </span>
            <Link to="/login" className={styles["not-logged__content__link"]}>
              <button
                className={styles["not-logged__content__link__continue-btn"]}
              >
                Continue
              </button>
            </Link>
          </div>
        </ReactModal>
      </div>
    </Fragment>
  );
};

export default NotLoggedIn;
