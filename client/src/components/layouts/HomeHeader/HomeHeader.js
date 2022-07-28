import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { hideLogInForm } from "../../../store/actions/signUpLogInForm";
import { useDispatch } from "react-redux";
import styles from "./HomeHeader.module.scss";

const HomeHeader = () => {
  const dispatch = useDispatch();

  const showSignUpForm = () => {
    dispatch(hideLogInForm());
  };
  return (
    <Fragment>
      <header className={styles["home__header__container"]}>
        <div className={styles["logo__container"]}>
          <span className={styles["logo"]}>LetsBook</span>
        </div>
        <div className={styles["nav__links__container"]}>
          <nav className={styles["nav__links"]}>
            <ul className={styles["ul__list__link"]}>
              <li className={styles["list__link"]}>
                {/* TODO: on hovering display message "chat with the customer support personel" */}
                <Link to="/chat" className={styles["link"]}>
                  Chat
                </Link>
              </li>
              <li className={styles["list__link"]}>
                <Link
                  to="/"
                  onClick={() => showSignUpForm()}
                  className={styles["link"]}
                >
                  Sign up
                </Link>
              </li>
              <li className={styles["list__link"]}>
                <Link to="/about" className={styles["link"]}>
                  About
                </Link>
              </li>
              <li className={styles["list__link__booking"]}>
                <Link to="/booking" className={styles["link"]}>
                  Book
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
