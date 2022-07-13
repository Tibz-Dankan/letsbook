import React, { Fragment, useState, useEffect, useRef } from "react";
import { baseUrl } from "../../../store/appStore";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import styles from "./MyBooking.module.scss";
import { log } from "../../../utils/consoleLog";
import Modal from "../Modal/Modal";
import { showNotificationModal } from "../../../store/actions/notification";
import { FadeLoader } from "react-spinners";
import Payment from "../Payment/Payment";

const MyBooking = () => {
  // TODO: list all my booking with their details
  //   Each booking details include the following
  // date when booking made
  // checkIn and checkOut date
  // payment status, show receipts if paid
  // TODO: Another component (CancelBooking) , api end point for cancelling the booking

  const [myBookings, setMyBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const userId = useSelector((state) => state.auth.user.userId);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const effectRan = useRef(false);
  const showAlertModal = useSelector((state) => state.notification.value);
  const userName = useSelector((state) => state.auth.user.userName);

  const getMyBookings = () => {
    return async () => {
      const response = await axios.get(`${baseUrl}/get-my-bookings/${userId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      log(response);
      if (response.data.errorMessage) {
        throw new Error(response.data.errorMessage);
      }
      setMyBookings(response.data);
    };
  };

  const getBookings = async () => {
    if (!userId) return;
    try {
      setIsLoading(true);
      await dispatch(getMyBookings());
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      await dispatch(showNotificationModal(error.message));
    }
  };

  useEffect(() => {
    if (effectRan.current === false) {
      getBookings();
      log("getting my bookings");
      return () => {
        effectRan.current = true;
      };
    }
  }, [myBookings]);

  // provides format  -> //7/3/2022
  const getDateString = (stringDateObject) => {
    const date = new Date(JSON.parse(stringDateObject).date);
    return date.toLocaleDateString();
  };
  //provides format  -> 3:47 AM
  const getTime = (stringDateObject) => {
    const date = new Date(JSON.parse(stringDateObject).date);
    return date.toLocaleTimeString("en-Us", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <Fragment>
      <div className={styles["my__booking__container"]}>
        {showAlertModal && <Modal isErrorMessage={isError} />}
        <div className={styles["fade__loader__container"]}>
          {isLoading && <FadeLoader />}
        </div>
        <div className={styles["my__booking__container"]}>
          {myBookings.map((booking) => {
            return (
              <div
                className={styles["my__booking__data"]}
                key={booking.booking_id}
              >
                <div className={styles["user__name"]}>
                  <span>{userName}</span>
                </div>
                <div className={styles["check__in__date"]}>
                  <span>{getDateString(booking.check_in_date)}</span>
                </div>
                <div className={styles["check__out__date"]}>
                  <span>{getDateString(booking.check_out_date)}</span>
                </div>
                <div className={styles["date__of__booking"]}>
                  <span>
                    {getDateString(booking.booking_date)}{" "}
                    {getTime(booking.booking_date)}
                  </span>
                </div>
                <div className={styles["room__no__name"]}>
                  {booking.room_name}
                </div>
                <div className={styles["room__price"]}>{booking.price}</div>
                <div className={styles["payment__status"]}>
                  {booking.has_paid === true ? (
                    <span className={styles["paid"]}>
                      Paid verify_icon here
                    </span>
                  ) : (
                    <span className={styles["not__paid"]}>Not Paid</span>
                  )}
                </div>
                <br /> {/*to be removed*/}
                <br /> {/*to be removed*/}
                <br /> {/*to be removed*/}
                <div className="payment__container">
                  <Payment />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default MyBooking;
