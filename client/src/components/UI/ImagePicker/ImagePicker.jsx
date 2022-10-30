import React, { useState, Fragment, useEffect } from "react";
import { useFilePicker } from "use-file-picker";
import styles from "./ImagePicker.module.scss";

const ImagePicker = (props) => {
  const [image, setImage] = useState(null);
  const [isDoneImageReview, setIsDoneImageReview] = useState(false);

  const [openFileSelector, { filesContent, loading, errors }] = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
    limitFilesConfig: { max: 1 },
    maxFileSize: 5,
  });

  useEffect(() => {
    filesContent.map((file, index) => {
      console.log(file);
      return setImage(file.content);
    });
  }, [filesContent]);

  const imageSaveHandler = () => {
    props.onSave(image);
  };

  return (
    <Fragment>
      {!isDoneImageReview && (
        <div className={styles["image__picker"]}>
          {!!errors.length && (
            <div className={styles["image__picker__error"]}>
              <span>Error occurred when selecting image</span>
            </div>
          )}
          {loading && (
            <div className={styles["image__picker__loading"]}>
              <span>Loading...</span>
            </div>
          )}
          {!image && (
            <div className={styles["image__picker__container"]}>
              <span className={styles["image__picker__heading"]}>
                Please Select {props.category} Image
              </span>
              <button onClick={() => openFileSelector()}>Select Image</button>
            </div>
          )}
          {image && (
            <div className={styles["image__picker__review"]}>
              <span className={styles["image__picker__review--msg"]}>
                Review Selected Image
              </span>
              <img
                src={image}
                alt="selected imageFile"
                className={styles["image__picker__review--image"]}
              />
              <button
                className={styles["image__picker__review--done"]}
                onClick={() => {
                  setIsDoneImageReview(true);
                  imageSaveHandler();
                  setImage("");
                }}
              >
                Done
              </button>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default ImagePicker;
