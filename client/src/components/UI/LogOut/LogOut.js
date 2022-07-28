import React, { Fragment } from "react";
import { logOut } from "../../../store/actions/auth";
import { useDispatch } from "react-redux";
import styles from "./LogOut.module.scss";
import { BsBoxArrowRight } from "react-icons/bs";
import { IconContext } from "react-icons";

const LogOut = () => {
  const dispatch = useDispatch();

  return (
    <Fragment>
      <div className={styles["logout__container"]}>
        <div
          className={styles["logout__paragraph"]}
          onClick={() => dispatch(logOut())}
        >
          <IconContext.Provider
            value={{
              color: "hsl(0, 100%, 60%)",
              size: "1.2em",
              className: "global-class-name",
            }}
          >
            <BsBoxArrowRight />
          </IconContext.Provider>
          <span> Log out</span>
        </div>
      </div>
    </Fragment>
  );
};

export default LogOut;
