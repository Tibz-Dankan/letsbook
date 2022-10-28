import axios from "axios";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../../store/appStore";
import styles from "./UploadImage.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { FadeLoader } from "react-spinners";
import Modal from "../Modal/Modal";
import ImagePicker from "../ImagePicker/ImagePicker";
import { showNotificationModal } from "../../../store/actions/notification";
import { disableEnableButton } from "../../../utils/disableEnableButton";
import { log } from "../../../utils/consoleLog";

const UploadImage = ({ apiEndpoint, id, category }) => {
  const [imageSelected, setImageSelected] = useState(null);
  const [isImageUploadSuccessful, setIsImageUploadSuccessful] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const showAlertModal = useSelector((state) => state.notification.value);
  const [isError, setIsError] = useState(false);
  // const userId = useSelector((state) => state.auth.user.userId);

  const onSelectImage = (image) => {
    setImageSelected(image);
  };

  const uploadImage = () => {
    return async (dispatch) => {
      let formData = new FormData();
      formData.append("image", imageSelected);
      const response = await axios.post(
        `${baseUrl}/${apiEndpoint}/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        }
      );
      log(response);
      if (response.data.errorMessage) {
        throw new Error(response.data.errorMessage);
      }
      await dispatch(showNotificationModal("Image upload successful"));
      setImageSelected("");
    };
  };

  const uploadImageHandler = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      disableEnableButton("submit-image-btn", true);
      await dispatch(uploadImage());
      setIsImageUploadSuccessful(true);
      setIsLoading(false);
      disableEnableButton("submit-image-btn", false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      await dispatch(showNotificationModal(error.message));
      disableEnableButton("submit-image-btn", false);
    }
  };

  return (
    <Fragment>
      <div className={styles["upload__image"]}>
        {showAlertModal && <Modal isErrorMessage={isError} />}
        {isLoading && (
          <div className={styles["upload__image__loader"]}>
            <FadeLoader />
          </div>
        )}
        <div className={styles["upload__image__picker"]}>
          <ImagePicker onSave={onSelectImage} category={category} />
        </div>
        {imageSelected && (
          <div className={styles["upload__image__container"]}>
            <div className={styles["upload__image__container--review"]}>
              <img
                src={imageSelected}
                alt="imageFile To be Uploaded"
                className={styles["image"]}
              />
            </div>
            <form
              encType="multipart/form-data"
              onSubmit={(event) => uploadImageHandler(event)}
            >
              <button type="submit" id="submit-image-btn">
                Upload Image
              </button>
            </form>
          </div>
        )}
        {isImageUploadSuccessful && (
          <div className={styles["image__upload__successful"]}>
            <span className={styles["image__upload__successful__msg"]}>
              Image uploaded successfully
            </span>
            <Link
              to="/rooms"
              className={styles["image__upload__successful__link"]}
            >
              Checkout the newly added room
            </Link>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default UploadImage;
