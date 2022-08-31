import React, { Fragment, useState } from "react";
import Modal from "../Modal/Modal";
import { FadeLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { showNotificationModal } from "../../../store/actions/notification";
import { ValidateStaffToken } from "../../../store/actions/auth";
import axios from "axios";
import { baseUrl } from "../../../store/appStore";
import { log } from "../../../utils/consoleLog";
import { disableEnableButton } from "../../../utils/disableEnableButton";
import styles from "./VerifyStaffToken.module.scss";

const VerifyStaffToken = () => {
  const [staffToken, setHandleStaffToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const showAlertModal = useSelector((state) => state.notification.value);

  const handleStaffTokenChange = (event) => {
    setHandleStaffToken(event.target.value);
  };

  const verifyStaffToken = () => {
    return async (dispatch) => {
      const response = await axios.post(`${baseUrl}/verify-staff-token`, {
        staffToken: staffToken,
      });
      log(response);
      if (response.data.errorMessage) {
        throw new Error(response.data.errorMessage);
      }
      await dispatch(ValidateStaffToken(staffToken));
      await dispatch(showNotificationModal("Token successfully verified"));
    };
  };

  const handleStaffTokenSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      disableEnableButton("verify-token-btn", true);
      await dispatch(verifyStaffToken());
      setIsLoading(false);
      disableEnableButton("verify-token-btn", false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.log("isError: " + isError);
      disableEnableButton("verify-token-btn", false);
      await dispatch(showNotificationModal(error.message));
    }
  };

  // TODO: fix bug (show show error notifications in red color not green)

  return (
    <Fragment>
      <div className={styles["verify__staff__token__container"]}>
        {showAlertModal && <Modal isErrorMessage={isError} />}
        <div className="fade__loader__wrapper">
          {isLoading && <FadeLoader />}
        </div>
        <div className={styles["form__container"]}>
          <form
            className={styles["form"]}
            onSubmit={(event) => handleStaffTokenSubmit(event)}
          >
            <div className={styles["form__input__group"]}>
              <input
                type="text"
                className={styles["input__field"]}
                value={staffToken}
                onChange={(event) => handleStaffTokenChange(event)}
                placeholder="Staff Token"
                required
              />
            </div>
            <div className={styles["btn__container"]}>
              <button
                type="submit"
                id="verify-token-btn"
                className={styles["btn"]}
              >
                Verify Token
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default VerifyStaffToken;
