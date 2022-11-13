import React, { Fragment } from "react";
import { Link } from "react-router-dom";
// import GoogleMapReact from "google-map-react";
import styles from "./Home.module.scss";
import GetRooms from "../../components/UI/GetRooms/GetRooms";
import mapPhoto from "../../assets/letsbook-map4.png";

import ImageSlider, { Slide } from "react-auto-image-slider";
import NotLoggedIn from "../../components/UI/NotLoggedIn/NotLoggedIn";

// TODO: Add meaningful information for the background images in animation

// const AnyReactComponent = ({ text }) => (
//   <div>
//     <b>{text}</b>
//   </div>
// );

const Home = () => {
  // const defaultProps = {
  //   center: {
  //     lat: 0.334873,
  //     lng: 32.567497,
  //   },
  //   zoom: 11,
  // };

  return (
    <Fragment>
      <div className={styles["home"]}>
        <header className={styles["home__header"]}>
          <div className={styles["home__header--logo"]}>
            <span>LetsBook</span>
          </div>
          <div className={styles["home__header--links"]}>
            <nav className={styles["home__header--links-nav"]}>
              <ul className={styles["home__header--links-nav-ul"]}>
                <li className={styles["home__header--links-nav-ul-list"]}>
                  <Link
                    to="/login"
                    className={styles["home__header--links-nav-ul-list-login"]}
                  >
                    LogIn
                  </Link>
                </li>
                <li className={styles["home__header--links-nav-ul-list"]}>
                  <Link
                    to="/signup"
                    className={styles["home__header--links-nav-ul-list-signup"]}
                  >
                    SignUp
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <section className={styles["home__animated"]}>
          <ImageSlider
            effectDelay={500}
            autoPlayDelay={2000}
            className={styles["home__animated__slider"]}
            controls={false}
          >
            <Slide>
              <div className={styles["home__animated--bg-image-one"]}>
                <div className={styles["home__animated--bg-image-one-content"]}>
                  <p>
                    some meaningful text info , some meaningful text info, some
                    meaningful text info, some meaningful text info, some
                    meaningful text info
                  </p>
                  <NotLoggedIn />
                </div>
              </div>
            </Slide>
            <Slide>
              <div className={styles["home__animated--bg-image-two"]}>
                <div className={styles["home__animated--bg-image-two-content"]}>
                  <p>
                    some meaningful text info , some meaningful text info, some
                    meaningful text info, some meaningful text info, some
                    meaningful text info
                  </p>
                  <NotLoggedIn />
                </div>
              </div>
            </Slide>
            <Slide>
              <div className={styles["home__animated--bg-image-three"]}>
                <div
                  className={styles["home__animated--bg-image-three-content"]}
                >
                  <p>
                    some meaningful text info , some meaningful text info, some
                    meaningful text info, some meaningful text info, some
                    meaningful text info
                  </p>
                  <NotLoggedIn />
                </div>
              </div>
            </Slide>
          </ImageSlider>
        </section>
        {/* Map to show location */}
        <section className={styles["home__map__about"]}>
          {/* <div
            style={{ height: "100vh", width: "100%" }}
            className={styles["home__map__about--map"]}
          >
            <GoogleMapReact
              bootstrapURLKeys={{ key: "" }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            >
              <AnyReactComponent
                lat={0.333360016}
                lng={32.5698051}
                text="LetsBook"
              />
            </GoogleMapReact>
          </div> */}
          <div className={styles["home__map__about--map"]}>
            <img
              src={mapPhoto}
              alt="letsBook_Map"
              className={styles["home__map__about--map-image"]}
            />
          </div>
          <div className={styles["home__map__about--about"]}>
            <h3>About</h3>
            <span className={styles["home__map__about--about-content"]}>
              <b>LetsBook</b> is a hotel booking system that allows clients to
              book room(s) of their choice at any time. It also has an inbuilt
              chat system to enable clients interact directly with Hotel
              Management Team in real time.
            </span>
          </div>
        </section>
        <section className={styles["home__rooms"]}>
          <GetRooms />
        </section>
      </div>
    </Fragment>
  );
};

export default Home;
