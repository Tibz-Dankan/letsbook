import React, { useState, Fragment } from "react";
import styles from "./ImagePicker.module.scss";

const ImagePicker = (props) => {
  const [photo, setPhoto] = useState({ preview: "", data: "" });
  const [imageErrorMsg, setImageErrorMsg] = useState("");
  const [isImageError, setIsImageError] = useState(false);
  let isValidImgType;

  const handleImageChange = (event) => {
    const image = {
      preview: URL.createObjectURL(event.target.files[0]),
      data: event.target.files[0],
    };
    console.log(image);
    setPhoto(image);
    validateImageFile();
    handleSelect();
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
    // setPhoto({ preview: "", data: "" });
    setIsImageError(true);
    setTimeout(() => {
      setImageErrorMsg("");
      setIsImageError(false);
    }, 5000);
    return false;
  };

  const isValidImageSize = (imageSize) => {
    const maximumAcceptableImageSize = 5242880; // 5mb
    if (imageSize < maximumAcceptableImageSize) return true;
    setImageErrorMsg("Only accept image size less than 5mb");
    // setPhoto({ preview: "", data: "" });
    setIsImageError(true);
    setTimeout(() => {
      setImageErrorMsg("");
      setIsImageError(false);
    }, 5000);
    return false;
  };

  const validateImageFile = () => {
    console.log(photo);
    const imageType = photo.data.type;
    const imageSize = photo.data.size;
    return isValidImageType(imageType) && isValidImageSize(imageSize);
  };

  const handleSelect = () => {
    props.onSelect(photo);
  };

  return (
    <Fragment>
      <div className={styles["image__picker"]}>
        {/* {isValidImgType && photo.preview && ( */}
        {photo.preview && (
          <img src={photo.preview} width="100px" height="100px" alt="Room" />
        )}
        {isImageError && (
          <span className={styles["image__picker__error"]}>
            {imageErrorMsg}
          </span>
        )}
        {!photo.preview && (
          <div className={styles["image__picker__input"]}>
            <input
              type="file"
              name="file"
              className={styles["image__picker__input__field"]}
              onChange={(event) => handleImageChange(event)}
              required
            />
          </div>
        )}
        {photo.preview && (
          <span onClick={() => setPhoto((prevPhotoData) => prevPhotoData)}>
            DONE
          </span>
        )}
      </div>
    </Fragment>
  );
};

export default ImagePicker;
