import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "./HomeHeader.module.scss";

const HomeHeader = () => {
  return (
    <Fragment>
      <header className={styles["home__header__container"]}>
        <div className={styles["logo__container"]}>
          <span className={styles["logo"]}>LetsBook</span>
        </div>
        <div className={styles["nav__links__container"]}>
          <nav className={styles["nav__links"]}>
            <ul className={styles["ul__list__link"]}>
              {/* <li className={styles["list__link"]}>
                TODO: on hovering display message "chat with the customer support personnel"
                <Link to="/chat" className={styles["link"]}>
                  Chat
                </Link>
              </li> */}
              <li className={styles["list__link"]}>
                <Link to="/signup" className={styles["link"]}>
                  SignUp
                </Link>
              </li>
              {/* <li className={styles["list__link"]}>
                <Link to="/about" className={styles["link"]}>
                  About
                </Link>
              </li> */}
              <li className={styles["list__link__booking"]}>
                <Link to="/login" className={styles["link"]}>
                  LogIn
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </Fragment>
  );
};

export default HomeHeader;
