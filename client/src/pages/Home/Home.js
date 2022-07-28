import React, { Fragment } from "react";
import styles from "./Home.module.scss";
import LogIn from "../../components/UI/LogIn/LogIn";
import SignUp from "../../components/UI/SignUp/SignUp";
import GeneralHeader from "../../components/layouts/GeneralHeader/GeneralHeader";
import Footer from "../../components/layouts/Footer/Footer";
import HomeHeader from "../../components/layouts/HomeHeader/HomeHeader";
import { useSelector } from "react-redux";

const Home = () => {
  const showSignUpFormOrLoginForm = useSelector(
    (state) => state.signUpLogInForm.value
  );

  return (
    <Fragment>
      <div className={styles["home__page"]}>
        <HomeHeader />
        {/* <GeneralHeader /> */}
        {showSignUpFormOrLoginForm && <LogIn />}
        {!showSignUpFormOrLoginForm && <SignUp />}
        {/* Animated images */}
        {/* Map to show location */}
        <Footer />
      </div>
    </Fragment>
  );
};

export default Home;
