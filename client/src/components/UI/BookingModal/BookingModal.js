import React, { useState, Fragment } from "react";
import styles from "./BookingModal.module.scss";
import { disableEnableButton } from "../../../utils/disableEnableButton";
import { log } from "../../../utils/consoleLog";
import { RiCloseLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { bookingRoom } from "../../../store/actions/booking";
import { showNotificationModal } from "../../../store/actions/notification";
import ReactModal from "react-modal";
import {FadeLoader} from "react-spinners";
import Modal from "../Modal/Modal";


const BookingModal = ({ roomDataObject }) => {
  const [numberOfGuests, setNumberOfGuests] = useState(0);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const showAlertModal = useSelector((state) => state.notification.value);
  const bookingId = useSelector((state) => state.booking.bookingStep.bookingId);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isError, setIsError] = useState(false);
  log(roomDataObject.room_name);
 
  const handleNumberOfGuests = (event) => {
    setNumberOfGuests(event.target.value);
  };

  const validateNumberOfGuests = ()=>{
    if (numberOfGuests <= 0  ){
        setErrorMsg("Please provide valid number of guests");
        setTimeout(()=>{
          setErrorMsg("");
        }, 5000);
        return;
    }
  }
  
    const [isModalOpen, setIsOpenModal] = useState(false);
    // styles
    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        color: "black",
        backgroundColor: "lightgrey",
        width: "40%",
      },
    };

    // TODO: change modal with using javascript

    const openModal = () => {
      setIsOpenModal(true);
    };

    const closeModal = () => {
      setIsOpenModal(false);
    };
  
    const afterOpenModal = () => {
    };

    //Binding the modal to the app
    ReactModal.setAppElement(document.getElementById("room__container"));

  const handleBookRoomSubmit = async (event, roomId) => {
    event.preventDefault();
    if (!bookingId || !token) return;
    validateNumberOfGuests();
    try {
      setIsLoading(true);
      disableEnableButton("booking-btn", true);
      await dispatch(bookingRoom(bookingId, token, roomId, numberOfGuests));
      setIsLoading(false);
      disableEnableButton("booking-btn", false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true)
      disableEnableButton("booking-btn", false);
      await dispatch(showNotificationModal(error.message));
    }
  };

  return (
    <Fragment>
      <div className={styles["open__booking__modal"]}>
        <button  onClick={()=>openModal()}>
          Book
        </button>
      </div>
      <div className={styles["alert__modal__container"]}>
        {
          showAlertModal && <Modal isErrorMessage={isError}/>
        }
      </div>
      <ReactModal
       isOpen={isModalOpen}
        ariaHideApp={false}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Number of Guests"
      >
        <div className={styles["booking__modal__data__container"]}>
          <div className={styles["number__guest__form__container"]}>
            {
              isLoading && (
              <div className={styles["fade__loader__container"]}>
                <FadeLoader color="hsl(266, 50%, 36%)"/>
                <span>Booking...</span>
              </div>
              )
          }
        <button
          className={styles["close__modal__btn"]}
          style={{ color: "black" }}
          onClick={() => closeModal()}
        >
          <RiCloseLine style={{ marginBottom: "-3px" }} />
        </button>
            <div className={styles["room__name"]}>
              <p>{roomDataObject.room_name}</p>
            </div>
            <form
              className={styles["form"]}
              onSubmit={(event) =>
                handleBookRoomSubmit(event, roomDataObject.room_id)
              }
            >
              <div className={styles["form__heading"]}>
                <p>Please enter number of guests</p>
              </div>
              <div className={styles["Invalid__guest__no__msg"]}>
                {errorMsg && <p>{errorMsg}</p>}
              </div>
              <div className={styles["form__input__group"]}>
                <input
                  type="number"
                  className={styles["form__input"]}
                  value={numberOfGuests}
                  onChange={(event) => handleNumberOfGuests(event)}
                  required
                />
              </div>
              <div className={styles["form__button__container"]}>
                <button
                  type="submit"
                  id="booking-btn"
                  className={styles["booking__btn"]}
                >
                  Book
                </button>
              </div>
            </form>
          </div>
        </div>
        </ReactModal> 
    </Fragment>
  );
};

export default BookingModal;
