import React, { Fragment } from "react";
import { logOut } from "../../../store/actions/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./LogOut.module.scss";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { IconContext } from "react-icons";

const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutHandler = async () => {
    await dispatch(logOut());
    navigate("/login", { replace: true });
  };

  return (
    <Fragment>
      <div className={styles["logout"]}>
        <div
          className={styles["logout__group"]}
          onClick={() => logOutHandler()}
        >
          <IconContext.Provider
            value={{
              color: "hsl(0, 100%, 60%)",
              size: "1.0em",
              className: "logout__group__icon",
            }}
          >
            <RiLogoutCircleRLine />
          </IconContext.Provider>
          <span className={styles["logout__group__text"]}> Log out</span>
        </div>
      </div>
    </Fragment>
  );
};

export default LogOut;
