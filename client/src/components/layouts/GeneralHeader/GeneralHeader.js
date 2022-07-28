import React, { Fragment } from "react";
import styles from "./GeneralHeader.module.scss";
import LoggedInAs from "../../UI/LoggedInAs/LoggedInAs";
import { Link } from "react-router-dom";

const GeneralHeader = ({ currentPage }) => {
  return (
    <Fragment>
      <header className={styles["general__header__container"]}>
        <div className={styles["current__page__container"]}>
          <span className={styles["current__page"]}>{currentPage}</span>
        </div>
        <div className={styles["logged__as__container"]}>
          <div className={styles["home__link"]}>
            <Link to="/" className={styles["link"]}>
              Home
            </Link>
          </div>
          <LoggedInAs />
        </div>
      </header>
    </Fragment>
  );
};

export default GeneralHeader;
