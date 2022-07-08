import React, { Fragment } from "react";
import styles from "./Modal.module.scss";
import { RiCloseLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { hideNotificationModal } from "../../../store/actions/notification";

const Modal = ({ isErrorMessage }) => {
  const notificationMessage = useSelector(
    (state) => state.notification.notificationMsg
  );
  const dispatch = useDispatch();

  return (
    <Fragment>
      <div
        className={styles["modal__container"]}
        onClick={() => dispatch(hideNotificationModal())}
      />
      <div className={styles["modal"]}>
        <button
          className={styles["close__btn"]}
          style={{ color: isErrorMessage ? "red" : "green" }}
          onClick={() => dispatch(hideNotificationModal())}
        >
          <RiCloseLine style={{ marginBottom: "-3px" }} />
        </button>

        <p className={styles["message__container"]}>
          <span
            className={styles["empty__span"]}
            style={{ backgroundColor: isErrorMessage ? "red" : "green" }}
          ></span>
          <span
            className={styles["message"]}
            style={{ color: isErrorMessage ? "red" : "green" }}
          >
            {notificationMessage}
          </span>
        </p>
      </div>
    </Fragment>
  );
};

export default Modal;
