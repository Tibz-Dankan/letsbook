import React, { Fragment, useState } from "react";
import ReactModal from "react-modal";
import { RiCloseLine } from "react-icons/ri";
import { GoPerson } from "react-icons/go";
import { IconContext } from "react-icons";
import { useSelector } from "react-redux";
import UploadImage from "../UploadImage/UploadImage";
import styles from "./UserImage.module.scss";

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

const UserImage = () => {
  const [updateUserImage, setUpdateUserImage] = useState(false);

  const userImage = useSelector((state) => state.auth.user.userImageUrl);
  const userId = useSelector((state) => state.auth.user.userId);

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
      <div className={styles["user-image"]}>
        <div
          className={styles["user-image__container"]}
          onClick={() => openModal()}
        >
          {userImage ? (
            <img
              src={userImage}
              alt="my-pic"
              className={styles["user-image__container--image"]}
            />
          ) : (
            <IconContext.Provider
              value={{
                color: "hsl(0, 0%, 60%)",
                size: "2.5em",
                className: styles["user-image__container--image-icon"],
              }}
            >
              <GoPerson />
            </IconContext.Provider>
          )}
        </div>
        <ReactModal
          isOpen={modalIsOpen}
          onAfterOpen={() => afterOpenModal()}
          onRequestClose={() => closeModal()}
          style={customStyles}
          ariaHideApp={false}
          contentLabel="Edit User Profile"
        >
          <div className={styles["user-image__content"]}>
            <button
              className={styles["user-image__content--close-modal-btn"]}
              onClick={() => closeModal()}
            >
              <RiCloseLine />
            </button>
            {!updateUserImage && (
              <section>
                <div className={styles["user-image__content__data"]}>
                  {userImage && (
                    <img
                      src={userImage}
                      alt="my-pic"
                      className={
                        styles["user-image__content__data--user-image"]
                      }
                    />
                  )}
                  {!userImage && (
                    <IconContext.Provider
                      value={{
                        color: "hsl(0, 0%, 60%)",
                        size: "2.5em",
                        className:
                          styles["user-image__content__data__icon__container"],
                      }}
                    >
                      <GoPerson className={styles["icon"]} />
                    </IconContext.Provider>
                  )}
                </div>
                <button
                  className={styles["user-image__content--update-image-btn"]}
                  onClick={() => setUpdateUserImage(true)}
                >
                  Update Image
                </button>
              </section>
            )}
            {updateUserImage && (
              <section className={styles["user-image__content--upload-image"]}>
                <UploadImage
                  apiEndpoint={"upload-user-image"}
                  id={userId}
                  category={"User"}
                />
              </section>
            )}
          </div>
        </ReactModal>
      </div>
    </Fragment>
  );
};

export default UserImage;
