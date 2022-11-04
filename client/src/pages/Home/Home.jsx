import React, { Fragment } from "react";
import styles from "./Home.module.scss";
// import LogIn from "../LogIn/LogIn";
// import SignUp from "../SignUp/SignUp";
// // import Footer from "../../components/layouts/Footer/Footer";
import HomeHeader from "../../components/layouts/HomeHeader/HomeHeader";
import GetRooms from "../../components/UI/GetRooms/GetRooms";
// import { useSelector } from "react-redux";

const Home = () => {
  // const showSignUpFormOrLoginForm = useSelector(
  //   (state) => state.signUpLogInForm.value
  // );

  // {/* TODO: fetch image url from the backend */}
  return (
    <Fragment>
      <div className={styles["home__page"]}>
        <HomeHeader />
        <div className={styles["room__form__container"]}>
          <div className={styles["room__image__container"]}>
            <img
              src={
                "https://res.cloudinary.com/dlmv4ot9h/image/upload/v1659598762/room-6_ixhjsz.jpg"
              }
              alt="room"
              className={styles["room__image"]}
            />
          </div>
          {/* <>
            {showSignUpFormOrLoginForm && <LogIn />}
            {!showSignUpFormOrLoginForm && <SignUp />}
          </> */}
        </div>
        <GetRooms />
        {/* Animated images */}
        {/* Map to show location */}
        {/* <Footer /> */}
      </div>
    </Fragment>
  );
};

export default Home;
