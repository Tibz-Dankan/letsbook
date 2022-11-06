import React, { Fragment } from "react";
import styles from "./Header.module.scss";
import LoggedInAs from "../../UI/LoggedInAs/LoggedInAs";

const Header = ({ title }) => {
  return (
    <Fragment>
      <header className={styles["header"]}>
        <div className={styles["header__title"]}>
          <span>{title}</span>
        </div>
        <div className={styles["header__logged-as"]}>
          {/* Notification bell here */}
          <LoggedInAs />
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
