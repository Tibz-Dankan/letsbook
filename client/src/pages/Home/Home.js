import React, { Fragment } from "react";
import styles from "./Home.module.scss";
import LogIn from "../../components/UI/LogIn/LogIn";
import SignUp from "../../components/UI/SignUp/SignUp";
import Footer from "../../components/layouts/Footer/Footer";
import HomeHeader from "../../components/layouts/HomeHeader/HomeHeader";
import { useSelector } from "react-redux";

const Home = () => {
  const showSignUpFormOrLoginForm = useSelector(
    (state) => state.signUpLogInForm.value
  );

  // {/* TODO: fetch image url from the backend */}
  return (
    <Fragment>
      <div className={styles["home__page"]}>
        <HomeHeader />
        <div className={styles["room__form__container"]}>
          <div className={styles["room__image__container"]}>
            <img
              src={"room url"}
              alt="room"
              className={styles["room__image"]}
            />
          </div>
          <>
            {showSignUpFormOrLoginForm && <LogIn />}
            {!showSignUpFormOrLoginForm && <SignUp />}
          </>
        </div>
        {/* Animated images */}
        {/* Map to show location */}
        <Footer />
      </div>
    </Fragment>
  );
};

export default Home;
