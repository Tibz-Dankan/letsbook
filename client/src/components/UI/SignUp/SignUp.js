import React, { useState, Fragment, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FadeLoader } from "react-spinners";
import { signup } from "../../../store/actions/auth";
import { disableEnableButton } from "../../../utils/disableEnableButton";
import styles from "./SignUp.module.scss";
import Select from "react-select";
import countryList from "react-select-country-list";
import Modal from "../Modal/Modal";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [countrySelected, setCountrySelected] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const showNotificationModal = useSelector(
    (state) => state.notification.value
  );
  const [isError, setIsError] = useState(false);

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const options = useMemo(() => countryList().getData(), []);

  const handleSelectedCountryChange = (value) => {
    setCountrySelected(value);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const showHidePassword = () => {
    switch (showPassword) {
      case true:
        setShowPassword(!showPassword);
        break;
      case false:
        setShowPassword(!showPassword);
        break;
      default:
    }
  };

  // const showLoginForm = () => {
  //   setTimeout(() => {
  //     navigate("/", { replace: true });
  //   }, 2000);
  // };

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    if (!userName || !email || !password) return;
    try {
      setIsLoading(true);
      disableEnableButton("signup-button", true);
      await dispatch(signup(userName, email, countrySelected.label, password));
      setIsLoading(false);
      disableEnableButton("signup-button", false);
      // dispatch an alert msg here to tell user to login
      navigate("/", { replace: true }); //Instead hide signup form show login form
    } catch (error) {
      setIsLoading(false);
      disableEnableButton("signup-button", false);
      setIsError(true);
      console.log("error msg: ", error.message);
    }
  };

  return (
    <Fragment>
      <div className={styles["signup__container"]}>
        {showNotificationModal && <Modal isErrorMessage={isError} />}
        <div className={styles["fade__loader__container"]}>
          {isLoading && <FadeLoader size={5} />}
        </div>
        <form
          className={styles["signup__form"]}
          onSubmit={(event) => handleSignUpSubmit(event)}
        >
          <p className={styles["signup__form__heading"]}>Sign Up</p>
          <div className={styles["signup__form__input__container"]}>
            <input
              type="text"
              placeholder="UserName"
              className={styles["signup__form__input"]}
              value={userName}
              onChange={(event) => handleUserNameChange(event)}
              required
            />
          </div>
          <div className={styles["signup__form__input__container"]}>
            <input
              type="email"
              placeholder="Email"
              className={styles["signup__form__input"]}
              value={email}
              onChange={(event) => handleEmailChange(event)}
              required
            />
          </div>
          <div className={styles["signup__form__input__container"]}>
            <Select
              options={options}
              value={countrySelected}
              onChange={(event) => handleSelectedCountryChange(event)}
              // autoFocus // to be implemented
              placeholder="Select Your Country"
              className={styles["signup__form__select__country"]}
            />
          </div>
          <div className={styles["signup__form__input__container"]}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={styles["signup__form__input"]}
              value={password}
              onChange={(event) => handlePasswordChange(event)}
              required
            />
            {showPassword && (
              <IconContext.Provider
                value={{ color: "black", className: "global-class-name" }}
              >
                <div onClick={() => showHidePassword()}>
                  <AiOutlineEyeInvisible />
                </div>
              </IconContext.Provider>
            )}
            {!showPassword && (
              <IconContext.Provider
                value={{ color: "black", className: "global-class-name" }}
              >
                <div onClick={() => showHidePassword()}>
                  <AiOutlineEye />
                </div>
              </IconContext.Provider>
            )}
          </div>
          <div className={styles["signup__form__input__container"]}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={styles["signup__form__input"]}
              value={confirmPassword}
              onChange={(event) => handleConfirmPasswordChange(event)}
              required
            />
            {showPassword && (
              <IconContext.Provider
                value={{ color: "black", className: "global-class-name" }}
              >
                <div onClick={() => showHidePassword()}>
                  <AiOutlineEyeInvisible />
                </div>
              </IconContext.Provider>
            )}
            {!showPassword && (
              <IconContext.Provider
                value={{ color: "black", className: "global-class-name" }}
              >
                <div onClick={() => showHidePassword()}>
                  <AiOutlineEye />
                </div>
              </IconContext.Provider>
            )}
          </div>
          <button
            type="submit"
            id="signup-button"
            className={styles["signup__form__btn"]}
            // disabled="disabled" //some testing here
          >
            Sign Up
          </button>
        </form>
        <div className={styles["have___account__container"]}>
          <p className={styles["have__account"]}>
            Already have account <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default SignUp;
