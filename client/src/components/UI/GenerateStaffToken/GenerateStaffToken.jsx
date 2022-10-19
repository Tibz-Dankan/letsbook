import React, { Fragment, useState } from "react";
import Modal from "../Modal/Modal";
import { FadeLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { showNotificationModal } from "../../../store/actions/notification";
import axios from "axios";
import { baseUrl } from "../../../store/appStore";
import { log } from "../../../utils/consoleLog";
import { disableEnableButton } from "../../../utils/disableEnableButton";
import styles from "./GenerateStaffToken.module.scss";

const GenerateStaffToken = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const showAlertModal = useSelector((state) => state.notification.value);
  const userId = useSelector((state) => state.auth.user.userId);
  const authToken = useSelector((state) => state.auth.token);

  const generateToken = () => {
    return async () => {
      const response = await axios.post(
        `${baseUrl}/generate-staff-token/${userId}`,
        {
          dateOfGeneration: JSON.stringify({ date: new Date(Date.now()) }),
        },
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      );
      log(response);
      if (response.data.errorMessage) {
        throw new Error(response.data.errorMessage);
      }
    };
  };
  // handle request submit
  const handleGenerateToken = async () => {
    if (!userId) return;
    try {
      setIsLoading(true);
      disableEnableButton("generate-btn", true);
      await dispatch(generateToken());
      setIsLoading(false);
      disableEnableButton("generate-btn", false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      disableEnableButton("generate-btn", false);
      await dispatch(showNotificationModal(error.message));
    }
  };

  return (
    <Fragment>
      <div className={styles["generate__staff__token__container"]}>
        {showAlertModal && <Modal isErrorMessage={isError} />}
        <div className={styles["fade__loader__container"]}>
          {isLoading && <FadeLoader />}
        </div>
        <div className={styles["btn__container"]}>
          <button
            id="generate-btn"
            type="button"
            className={styles["btn"]}
            onClick={() => handleGenerateToken()}
          >
            Generate Token
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default GenerateStaffToken;
