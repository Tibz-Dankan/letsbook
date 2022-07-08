/* eslint-disable no-unused-vars */
import React, { Fragment } from "react";
import styles from "./Home.module.scss";
import LogIn from "../../components/UI/LogIn/LogIn";
import SignUp from "../../components/UI/SignUp/SignUp";
import Header from "../../components/layouts/Header/Header";
import Footer from "../../components/layouts/Footer/Footer";
import LogOut from "../../components/UI/LogOut/LogOut";

const Home = () => {
  return (
    <Fragment>
      <div className={styles["home__page"]}>
        <Header />
        <LogOut />
        <LogIn />
        <SignUp />
        <Footer />
      </div>
    </Fragment>
  );
};

export default Home;
