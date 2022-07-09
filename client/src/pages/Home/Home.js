import React, { Fragment } from "react";
import styles from "./Home.module.scss";
import LogIn from "../../components/UI/LogIn/LogIn";
import SignUp from "../../components/UI/SignUp/SignUp";
import Header from "../../components/layouts/Header/Header";
import Footer from "../../components/layouts/Footer/Footer";
import LogOut from "../../components/UI/LogOut/LogOut";
import { useSelector } from "react-redux";

const Home = () => {
  const showSignUpFormOrLoginForm = useSelector(
    (state) => state.signUpLogInForm.value
  );

  return (
    <Fragment>
      <div className={styles["home__page"]}>
        <Header />
        <LogOut />
        {showSignUpFormOrLoginForm && <LogIn />}
        {!showSignUpFormOrLoginForm && <SignUp />}
        <Footer />
      </div>
    </Fragment>
  );
};

export default Home;
