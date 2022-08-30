import React, { useState, Fragment, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { FadeLoader } from "react-spinners";
import { signup } from "../../../store/actions/auth";
import { disableEnableButton } from "../../../utils/disableEnableButton";
import styles from "./SignUp.module.scss";
import Select from "react-select";
import countryList from "react-select-country-list";
import Modal from "../Modal/Modal";
import { hideSignUpForm } from "../../../store/actions/signUpLogInForm";

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
  const [passwordValidationMsg, setPasswordValidationMsg] = useState("");
  const [isPasswordError, setIsPasswordError] = useState(false);

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

  const showLoginForm = () => {
    setTimeout(async () => {
      await dispatch(hideSignUpForm()); //Hiding signup and showing login form
    }, 2000);
  };

  const arePasswordsMatching = () => {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    if (password === confirmPassword) return true;
    setPasswordValidationMsg("**Passwords don't match");
    setIsPasswordError(true);
    setTimeout(() => {
      setPasswordValidationMsg("");
      setIsPasswordError(false);
    }, 5000);
    return false;
  };

  const isValidPasswordLength = () => {
    const password = document.getElementById("password").value;
    if (password.length >= 6 && password.length <= 15) return true;
    setPasswordValidationMsg(
      "**Passwords must be at least 6 characters and must not exceed 15"
    );
    setIsPasswordError(true);
    setTimeout(() => {
      setPasswordValidationMsg("");
      setIsPasswordError(true);
    }, 5000);
    return false;
  };

  // Handling signup of a user with role "user"
  const handleSignUpSubmit = async () => {
    if (!userName || !email || !password) return;
    try {
      setIsLoading(true);
      disableEnableButton("signup-button", true);
      await dispatch(
        signup(userName, email, countrySelected.label, password, "user")
      );
      setIsLoading(false);
      disableEnableButton("signup-button", false);
      showLoginForm();
    } catch (error) {
      setIsLoading(false);
      disableEnableButton("signup-button", false);
      setIsError(true);
      console.log("error msg: ", error.message);
    }
  };

  const validPasswordOnSubmit = (event) => {
    event.preventDefault();
    isValidPasswordLength() && arePasswordsMatching() && handleSignUpSubmit();
  };

  // const reactSelectCustomStyles = () => {
  //   menu: (provided, state) => ({
  //     ...provided,
  //     width: state.selectProps.width,
  //     borderBottom: "1px dotted",
  //     color: state.selectProps.menuColor,
  //     padding: 20,
  //   });
  //   control:() => ({ selectProps: { width } });
  //   // width:width }),
  // };

  return (
    <Fragment>
      <div className={styles["signup__container"]}>
        {showNotificationModal && <Modal isErrorMessage={isError} />}
        {isLoading && (
          <div className={styles["fade__loader__container"]}>
            {/* <FadeLoader
            color="hsl(266, 50%, 36%)"
            className={styles["spinner"]}
          /> */}
            <span>Signing up...</span>
          </div>
        )}
        <form
          className={styles["signup__form"]}
          onSubmit={(event) => validPasswordOnSubmit(event)}
        >
          <p className={styles["signup__form__heading"]}>
            Sign up for an account
          </p>
          <div className={styles["signup__form__input__container"]}>
            <input
              type="text"
              placeholder="User Name"
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
              // className={styles["signup__form__select__country"]}
              classNamePrefix={styles["signup__form__input"]}
            />
          </div>
          {isPasswordError && (
            // TODO: display this message in the modal
            <span className={styles["password-error"]}>
              {passwordValidationMsg}
            </span>
          )}
          <div className={styles["signup__form__input__container"]}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              id="password"
              className={styles["signup__form__input"]}
              value={password}
              onChange={(event) => handlePasswordChange(event)}
              required
            />
            {showPassword && (
              <IconContext.Provider
                value={{
                  color: "black",
                  className: styles["eye__icon__container"],
                }}
              >
                <div onClick={() => showHidePassword()}>
                  <AiOutlineEyeInvisible />
                </div>
              </IconContext.Provider>
            )}
            {!showPassword && (
              <IconContext.Provider
                value={{
                  color: "black",
                  className: styles["eye__icon__container"],
                }}
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
              placeholder="Confirm Password"
              className={styles["signup__form__input"]}
              id="confirm-password"
              value={confirmPassword}
              onChange={(event) => handleConfirmPasswordChange(event)}
              required
            />
            {showPassword && (
              <IconContext.Provider
                value={{
                  color: "black",
                  className: styles["eye__icon__container"],
                }}
              >
                <div onClick={() => showHidePassword()}>
                  <AiOutlineEyeInvisible />
                </div>
              </IconContext.Provider>
            )}
            {!showPassword && (
              <IconContext.Provider
                value={{
                  color: "black",
                  className: styles["eye__icon__container"],
                }}
              >
                <div onClick={() => showHidePassword()}>
                  <AiOutlineEye />
                </div>
              </IconContext.Provider>
            )}
          </div>
          <div className={styles["signup__form__btn__container"]}>
            <button
              type="submit"
              id="signup-button"
              className={styles["signup__form__btn"]}
              // disabled="disabled" //some testing here
            >
              Sign Up
            </button>
          </div>
          <div className={styles["have___account__container"]}>
            <p className={styles["have__account"]}>
              Already have account{" "}
              <Link
                to="/"
                onClick={() => dispatch(hideSignUpForm())}
                className={styles["link"]}
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default SignUp;
