import React, { Fragment, useState, useEffect, useRef } from "react";
import { baseUrl } from "../../../store/appStore";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import styles from "./MyBooking.module.scss";
import { log } from "../../../utils/consoleLog";
import Modal from "../Modal/Modal";
import { showNotificationModal } from "../../../store/actions/notification";
import { FadeLoader } from "react-spinners";
// import Payment from "../Payment/Payment";
// import { GiMushroomHouse } from "react-icons/gi";
import { MdOutlineBedroomParent } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import { AiFillCheckCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import bookedRoomPhoto from "../../../assets/booked-room1.jpeg";

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
  // const userName = useSelector((state) => state.auth.user.userName);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // generate booking id
  const generateBookingIdString = (bookingIdFromDb) => {
    const bookingIdString = "#LBR" + bookingIdFromDb;
    log(bookingIdString);
    return bookingIdString;
  };

  // calculate number of nights
  const numberOfNights = (checkInDateStrObj, checkOutDateStrObj) => {
    const day = 1000 * 60 * 60 * 24;
    const checkInDate = JSON.parse(checkInDateStrObj).date;
    const checkOutDate = JSON.parse(checkOutDateStrObj).date;
    const numberOfNights =
      (new Date(checkOutDate) - new Date(checkInDate)) / day;
    return Math.floor(numberOfNights);
  };

  // calculate total amount of the booking
  const totalAmountOfBooking = (
    roomPrice,
    noOfGuests,
    checkInDateStrObj,
    checkOutDateStrObj
  ) => {
    const numOfNights = numberOfNights(checkInDateStrObj, checkOutDateStrObj);
    const totalAmount = roomPrice * noOfGuests * numOfNights;
    return totalAmount;
  };

  return (
    <Fragment>
      <div className={styles["user__booking__data__container"]}>
        {showAlertModal && <Modal isErrorMessage={isError} />}
        {isLoading && (
          <div className={styles["fade__loader__container"]}>
            <FadeLoader
              color="hsl(266, 50%, 36%)"
              className={styles["spinner"]}
            />
            <span>Fetching...</span>
          </div>
        )}
        {myBookings.map((booking) => {
          return (
            <div
              className={styles["user__booking__data__outer__container"]}
              key={booking.booking_id}
            >
              <div className={styles["user__booking__data__inner__container"]}>
                <div className={styles["user__data__container"]}>
                  <div className={styles["user__image"]}>
                    {booking.user_image_url ? (
                      <img src={booking.user_image_url} alt="profile_pic" />
                    ) : (
                      <IconContext.Provider
                        value={{
                          color: "hsl(206, 50%, 70%)",
                          className: styles["person__icon__container"],
                          size: "3em",
                        }}
                      >
                        <GoPerson />
                      </IconContext.Provider>
                    )}
                  </div>
                  <div className={styles["user__data"]}>
                    <span className={styles["user__name"]}>
                      {booking.user_name}
                    </span>
                    <span className={styles["email"]}>{booking.email}</span>
                    <span className={styles["nationality"]}>
                      {booking.country}
                    </span>
                    <span className={styles["tel__number"]}>
                      {booking.tel_number
                        ? booking.tel_number
                        : "Telephone number"}
                    </span>
                  </div>
                </div>
                <div className={styles["guest__num__checkin__checkout"]}>
                  <div className={styles["check__in__date__container"]}>
                    <span className={styles["check__in__date__label"]}>
                      Check In
                    </span>
                    <span className={styles["check__in__date"]}>
                      {getDateString(booking.check_in_date)}
                    </span>
                  </div>
                  <div className={styles["check__out__date__container"]}>
                    <span className={styles["check__out__date__label"]}>
                      Check Out
                    </span>
                    <span className={styles["check__out__date"]}>
                      {getDateString(booking.check_out_date)}
                    </span>
                  </div>
                  <div className={styles["guest__night__num__container"]}>
                    <div className={styles["guest__num__container"]}>
                      <span className={styles["guest__num__label"]}>
                        Guests
                      </span>
                      <span className={styles["guest__num"]}>
                        {booking.no_of_guests}
                      </span>
                    </div>
                    <div className={styles["night__num__container"]}>
                      <span className={styles["night__num__label"]}>
                        Nights
                      </span>
                      <span className={styles["night__num"]}>
                        {numberOfNights(
                          booking.check_in_date,
                          booking.check_out_date
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={styles["payment__data"]}>
                  <div className={styles["amount__total__container"]}>
                    <span className={styles["amount__total__label"]}>
                      Total amount{" "}
                    </span>
                    <span className={styles["amount__total"]}>
                      {totalAmountOfBooking(
                        booking.price,
                        booking.no_of_guests,
                        booking.check_in_date,
                        booking.check_out_date
                      )}{" "}
                      USD
                    </span>
                  </div>
                  <div className={styles["amount__due__container"]}>
                    <span className={styles["amount__due__label"]}>
                      Amount Due{" "}
                    </span>
                    <span className={styles["amount__due"]}>
                      {booking.has_paid === true ? (
                        <>0 USD</>
                      ) : (
                        <>
                          {totalAmountOfBooking(
                            booking.price,
                            booking.no_of_guests,
                            booking.check_in_date,
                            booking.check_out_date
                          )}{" "}
                          USD
                        </>
                      )}
                    </span>
                  </div>
                  <div className={styles["payment__status__container"]}>
                    <span className={styles["payment__status__label"]}>
                      Status{" "}
                    </span>
                    {booking.has_paid === true ? (
                      <span className={styles["paid"]}>
                        <>Paid </>
                        <IconContext.Provider
                          value={{
                            color: "hsl(120, 100%, 40%)",
                            className: styles["fill__check__circle__icon"],
                          }}
                        >
                          <AiFillCheckCircle />
                        </IconContext.Provider>
                      </span>
                    ) : (
                      <span className={styles["not__paid"]}>Not Paid</span>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles["booking__reservation__details"]}>
                <span className={styles["reservation__heading"]}>
                  Reservation Details
                </span>
                <div className={styles["reservation__data__container"]}>
                  <div className={styles["reservation__data"]}>
                    {/* Booking id */}
                    <div className={styles["booking__id__container"]}>
                      <span className={styles["booking__id__label"]}>
                        Booking ID
                      </span>
                      <span className={styles["booking__id"]}>
                        {generateBookingIdString(booking.booking_id)}
                      </span>
                    </div>
                    {/* Booking date */}
                    <div className={styles["booking__date__container"]}>
                      <span className={styles["booking__date__label"]}>
                        Booking Date
                      </span>
                      <span className={styles["booking__date"]}>
                        {getDateString(booking.booking_date)}{" "}
                        {getTime(booking.booking_date)}
                      </span>
                    </div>
                    {/* Booked room name */}
                    <div className={styles["booked__room__container"]}>
                      <span className={styles["booked__room__label"]}>
                        Booked Room
                      </span>
                      <span className={styles["booked__room"]}>
                        {booking.room_name}
                      </span>
                    </div>
                  </div>
                  <div className={styles["booked__room__image"]}>
                    {/* booked__room__image */}
                    {booking.room_image_url ? (
                      <img
                        src={booking.room_image_url}
                        alt={booking.room_name}
                      />
                    ) : (
                      // <IconContext.Provider
                      //   value={{
                      //     color: "hsl(206, 50%, 70%)",
                      //     className: styles["room__icon__container"],
                      //     size: "8em",
                      //   }}
                      // >
                      //   <MdOutlineBedroomParent />
                      // </IconContext.Provider>
                      <img
                        src={bookedRoomPhoto}
                        alt="booked-room"
                        style={{ width: "100%" }}
                      />
                    )}
                  </div>
                </div>
              </div>
              {/* <br />
              <br /> 
              <br /> 
              <div className="payment__container">
                <Payment />
              </div> */}
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default MyBooking;
