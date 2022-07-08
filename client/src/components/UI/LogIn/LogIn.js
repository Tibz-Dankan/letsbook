import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FadeLoader } from "react-spinners";
import { login } from "../../../store/actions/auth";
import { disableEnableButton } from "../../../utils/disableEnableButton";
import { log } from "../../../utils/consoleLog";
import Modal from "../Modal/Modal";
import styles from "./LogIn.module.scss";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const showNotificationModal = useSelector(
    (state) => state.notification.value
  );
  const [isError, setIsError] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
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

  const handleLogInSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) return;
    try {
      setIsLoading(true);
      disableEnableButton("button", true);
      await dispatch(login(email, password));
      setIsLoading(false);
      disableEnableButton("button", false);
      navigate("/chat", { replace: true });
    } catch (error) {
      setIsLoading(false);
      disableEnableButton("button", false);
      setIsError(true);
      log("error msg: " + error.message);
    }
  };

  return (
    <Fragment>
      <div className={styles["login__container"]}>
        {showNotificationModal && <Modal isErrorMessage={isError} />}
        <div className={styles["fade__loader__container"]}>
          {isLoading && <FadeLoader />}
        </div>
        <form
          className={styles["login__form"]}
          onSubmit={(event) => handleLogInSubmit(event)}
        >
          <p className={styles["login__form__heading"]}>Log In</p>
          <div className={styles["login__form__input__container"]}>
            <input
              type="email"
              placeholder="Email"
              className={styles["login__form__input"]}
              value={email}
              onChange={(event) => handleEmailChange(event)}
              required
            />
          </div>
          <div className={styles["login__form__input__container"]}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={styles["login__form__input"]}
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
          <button
            id="button"
            type="submit"
            className={styles["login__form__btn"]}
          >
            Log In
          </button>
        </form>
        <div className={styles["forgot__password__container"]}>
          <p>Forgot Password?</p>
        </div>
        <div className={styles["dont__have___account__container"]}>
          <p className={styles["dont__have__account"]}>
            Don't have account <Link to="/signup">SignUp</Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default LogIn;
