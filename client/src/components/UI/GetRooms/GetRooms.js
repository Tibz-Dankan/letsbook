import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { baseUrl } from "../../../store/appStore";
import { log } from "../../../utils/consoleLog";
import roomPhoto from "../../../assets/room1.jpeg";
import { FadeLoader } from "react-spinners";
import styles from "./GetRooms.module.scss";

const GetRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  log("In the get room component");

  const getRooms = () => {
    return async () => {
      const response = await axios.get(`${baseUrl}/get-rooms`);
      log(response);
      if (response.data.errorMessage) {
        throw new Error(response.data.errorMessage);
      }
      setRooms(response.data);
    };
  };

  useEffect(() => {
    const handleGetRooms = async () => {
      try {
        setIsLoading(true);
        await dispatch(getRooms());
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    handleGetRooms();
  }, [dispatch]);

  return (
    <Fragment>
      <div className={styles["get__rooms"]}>
        {isLoading && (
          <div className={styles["get__rooms__spinner__container"]}>
            <FadeLoader
              color="hsl(266, 50%, 36%)"
              className={styles["spinner"]}
            />
            <span>Fetching rooms...</span>
          </div>
        )}
        <div className={styles["get__rooms__heading"]}>
          <span> Rooms available for booking</span>
        </div>
        {rooms.map((room, index) => {
          return (
            <div key={index} className={styles["rooms"]}>
              <div className={styles["rooms__content"]}>
                {room.room_image_url === "null" ? (
                  <img
                    src={roomPhoto}
                    alt="room"
                    className={styles["rooms__content__image"]}
                  />
                ) : (
                  <img
                    src={room.room_image_url}
                    alt="room"
                    className={styles["rooms__content__image"]}
                  />
                )}
                <span className={styles["rooms__content__name"]}>
                  {room.room_name}
                </span>
                <span className={styles["rooms__content__description"]}>
                  {room.room_description}
                </span>
                {isLoggedIn && (
                  <Link
                    to="/booking"
                    className={styles["rooms__content__link"]}
                  >
                    <button className={styles["rooms__content__link__btn"]}>
                      Book
                    </button>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default GetRooms;
