import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactModal from "react-modal";
import axios from "axios";
import Modal from "../Modal/Modal";
import { baseUrl } from "../../../store/appStore";
import { log } from "../../../utils/consoleLog";
import { showNotificationModal } from "../../../store/actions/notification";
import styles from "./MobileMoney.module.scss";
import mtnLogo from "../../../assets/mtn-logo.png";

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

const MobileMoney = ({ roomDataObject }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [telPhoneNo, setTelPhoneNo] = useState("");
  const [amountOfMoney, setAmountOfMoney] = useState(0);
  const network = "MTN";
  const userId = useSelector((state) => state.auth.user.userId);
  const roomId = roomDataObject.room_id;
  const token = useSelector((state) => state.auth.token);
  const showAlertModal = useSelector((state) => state.notification.value);
  const dispatch = useDispatch();

  const handleTelPhoneNo = (event) => {
    setTelPhoneNo(event.target.value);
  };
  const handleAmountOfMoney = (event) => {
    setAmountOfMoney(event.target.value);
  };

  // TODO: api request
  const makeMobilePayment = () => {
    return async (dispatch) => {
      const response = await axios.post(
        `${baseUrl}/mobile-money-or-airtel-money/${userId}/${roomId}`,
        {
          amount: amountOfMoney,
          network: network,
          telPhoneNumber: telPhoneNo,
        },
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
      await dispatch(showNotificationModal(response.data.errorMessage));
    };
  };

  // TODO: handle submit mobile money
  const MakeMobileMoneyPaymentHandler = async (event) => {
    console.log("paying...");
    event.preventDefault();
    if (!userId || roomId) return;
    try {
      setIsLoading(true);
      await dispatch(makeMobilePayment());
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      await dispatch(showNotificationModal(error.message));
    }
  };

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
      <div className={styles["mobile-money"]}>
        <button
          onClick={() => openModal()}
          className={styles["mobile-money__open-modal"]}
        >
          Payment Using Mobile Money{" "}
        </button>
      </div>
      <ReactModal
        isOpen={modalIsOpen}
        onAfterOpen={() => afterOpenModal()}
        onRequestClose={() => closeModal()}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Example Modal"
      >
        <div className={styles["mobile-money__content"]}>
          {showAlertModal && <Modal isErrorMessage={isError} />}
          {isLoading && (
            <div className={styles["mobile-money__content--loader"]}>
              <span>Paying...</span>
            </div>
          )}
          <div className={styles["mobile-money__content--logo"]}>
            <span className={styles["mobile-money__content--logo-heading"]}>
              Mobile Money
            </span>
            <img
              src={mtnLogo}
              alt="mtn logo"
              className={styles["mobile-money__content--logo-image"]}
              style={{ width: "40px", height: "40px" }}
            />
          </div>
          <form
            onSubmit={(event) => MakeMobileMoneyPaymentHandler(event)}
            className={styles["mobile-money__content--form"]}
          >
            <div className={styles["form__input__group"]}>
              <input
                className={styles["input__field"]}
                // type="tel"
                type="number"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                name="phone"
                value={telPhoneNo}
                onChange={(event) => handleTelPhoneNo(event)}
                placeholder="Tel Number"
                required
              />
            </div>
            <div className={styles["form__input__group"]}>
              <input
                className={styles["input__field"]}
                type="number"
                data-type="currency" // under test
                value={amountOfMoney}
                onChange={(event) => handleAmountOfMoney(event)}
                placeholder="amount ugx"
                required
              />
            </div>
            <div className={styles["btn__container"]}>
              <button type="submit">Pay</button>
            </div>
          </form>
        </div>
      </ReactModal>
    </Fragment>
  );
};

export default MobileMoney;
