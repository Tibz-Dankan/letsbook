import React, { Fragment } from "react";
import { logOut } from "../../../store/actions/auth";
import { useDispatch } from "react-redux";
import styles from "./LogOut.module.scss";

const LogOut = () => {
  const dispatch = useDispatch();

  return (
    <Fragment>
      <div className={styles["logout__container"]}>
        <p
          className={styles["logout__paragraph"]}
          onClick={() => dispatch(logOut())}
        >
          Log out
        </p>
      </div>
    </Fragment>
  );
};

export default LogOut;
