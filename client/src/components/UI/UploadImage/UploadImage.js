import axios from "axios";
import React, { Fragment, useState } from "react";
import { baseUrl } from "../../../store/appStore";
import styles from "./UploadImage.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { FadeLoader } from "react-spinners";
import Modal from "../Modal/Modal";
import { showNotificationModal } from "../../../store/actions/notification";
import { disableEnableButton } from "../../../utils/disableEnableButton";

const UploadImage = () => {
  const [image, setImage] = useState({ preview: "", data: "" });

  const token = useSelector((state) => state.auth.token);
  const [imageErrorMsg, setImageErrorMsg] = useState("");
  const [isImageError, setIsImageError] = useState(false);
  let isValidImgType;
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const showAlertModal = useSelector((state) => state.notification.value);
  const [isError, setIsError] = useState(false);
  const userId = useSelector((state) => state.auth.user.userId);

  const handleImageChange = (event) => {
    const img = {
      preview: URL.createObjectURL(event.target.files[0]),
      data: event.target.files[0],
    };
    console.log(img);
    setImage(img);
  };

  const isValidImageType = (imageType) => {
    isValidImgType =
      imageType === "image/jpeg" ||
      imageType === "image/jpg" ||
      imageType === "image/png";
    if (isValidImgType) return true;
    setImageErrorMsg(
      "Only accept image files that end with .jpeg, .jpg and .png"
    );
    setIsImageError(true);
    setTimeout(() => {
      setImageErrorMsg("");
      setIsImageError(false); // Hide the message after 5 seconds
    }, 5000);
    return false;
  };

  const isValidImageSize = (imageSize) => {
    const maximumAcceptableImageSize = 5242880; // 5mb
    if (imageSize < maximumAcceptableImageSize) return true;
    setIsImageError(true);
    setImageErrorMsg("Only accept image size less than 5mb");
    setTimeout(() => {
      setImageErrorMsg("");
      setIsImageError(false); // Remove the message after 5 seconds
    }, 5000);
    return false;
  };

  const validateImageFile = () => {
    console.log(image.data);
    const imageType = image.data.type;
    const imageSize = image.data.size;
    return isValidImageType(imageType) && isValidImageSize(imageSize);
  };

  const uploadImage = () => {
    return async (dispatch) => {
      let formData = new FormData();
      formData.append("file", image.data);
      formData.append("userId", userId);
      formData.append("room_id", 56);
      const response = await axios.post(`${baseUrl}/upload-image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      });
      console.log(response);
      if (response.data.errorMessage) {
        throw new Error(response.data.errorMessage);
      }
      await dispatch(showNotificationModal("Image upload successful"));
    };
  };

  const handleImageSubmit = async (event) => {
    try {
      setIsLoading(true);
      disableEnableButton("submit-image-btn", true);
      await dispatch(uploadImage());
      setIsLoading(false);
      disableEnableButton("submit-image-btn", false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      await dispatch(showNotificationModal(error.message));
      disableEnableButton("submit-image-btn", false);
    }
  };

  const validateImageSubmit = (event) => {
    event.preventDefault();
    validateImageFile() && handleImageSubmit();
  };

  return (
    <Fragment>
      <div className={styles["image__container"]}>
        {showAlertModal && <Modal isErrorMessage={isError} />}
        <div className={styles["fade__loader__container"]}>
          {isLoading && <FadeLoader />}
        </div>
        <h1>Upload Image</h1>
        {isValidImgType && image.preview && (
          <img src={image.preview} width="100" height="100" alt="room-pic" />
        )}
        {isImageError && (
          <span className={styles["image__error"]}>{imageErrorMsg}</span>
        )}
        <div className={styles["form__container"]}>
          <form
            onSubmit={(event) => validateImageSubmit(event)}
            className={styles["form"]}
          >
            <div className={styles["input__field__container"]}>
              <input
                type="file"
                name="file"
                onChange={(event) => handleImageChange(event)}
                required
              />
            </div>
            <div className={styles["submit__Image__btn__container"]}>
              <button
                type="submit"
                id="submit-image-btn"
                className={styles["submit__image__btn btn"]}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UploadImage;
