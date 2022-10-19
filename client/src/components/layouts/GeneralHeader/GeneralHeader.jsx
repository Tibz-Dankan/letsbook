import React, { Fragment } from "react";
import styles from "./GeneralHeader.module.scss";
import LoggedInAs from "../../UI/LoggedInAs/LoggedInAs";
// import { Link } from "react-router-dom";

const GeneralHeader = ({ title }) => {
  return (
    <Fragment>
      <header className={styles["general__header__container"]}>
        <div className={styles["title__container"]}>
          <span className={styles["title"]}>{title}</span>
        </div>
        <div className={styles["logged__as__container"]}>
          {/* Notification bell here */}
          {/* <div className={styles["home__link"]}>
            <Link to="/" className={styles["link"]}>
              Home
            </Link>
          </div> */}
          <LoggedInAs />
        </div>
      </header>
    </Fragment>
  );
};

export default GeneralHeader;
