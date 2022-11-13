import React, { Fragment } from "react";
import styles from "./RoomsLoadingSkeleton.module.scss";

const RoomsLoadingSkeleton = () => {
  return (
    <Fragment>
      <div className={styles["rooms-loading-skeleton"]}>
        <div className={styles["rooms-loading-skeleton__room-content"]}>
          <div
            className={styles["rooms-loading-skeleton__room-content--image"]}
          ></div>
          <div
            className={styles["rooms-loading-skeleton__room-content--name"]}
          ></div>
          <div
            className={
              styles["rooms-loading-skeleton__room-content--description"]
            }
          ></div>
          <div
            className={styles["rooms-loading-skeleton__room-content--button"]}
          ></div>
        </div>
      </div>
      <div className={styles["rooms-loading-skeleton"]}>
        <div className={styles["rooms-loading-skeleton__room-content"]}>
          <div
            className={styles["rooms-loading-skeleton__room-content--image"]}
          ></div>
          <div
            className={styles["rooms-loading-skeleton__room-content--name"]}
          ></div>
          <div
            className={
              styles["rooms-loading-skeleton__room-content--description"]
            }
          ></div>
          <div
            className={styles["rooms-loading-skeleton__room-content--button"]}
          ></div>
        </div>
      </div>
      <div className={styles["rooms-loading-skeleton"]}>
        <div className={styles["rooms-loading-skeleton__room-content"]}>
          <div
            className={styles["rooms-loading-skeleton__room-content--image"]}
          ></div>
          <div
            className={styles["rooms-loading-skeleton__room-content--name"]}
          ></div>
          <div
            className={
              styles["rooms-loading-skeleton__room-content--description"]
            }
          ></div>
          <div
            className={styles["rooms-loading-skeleton__room-content--button"]}
          ></div>
        </div>
      </div>
    </Fragment>
  );
};

export default RoomsLoadingSkeleton;
