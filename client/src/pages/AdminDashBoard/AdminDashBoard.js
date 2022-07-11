import React, { Fragment } from "react";
import AddRoom from "../../components/UI/AddRoom/AddRoom";
import styles from "./AdminDashBoard.module.scss";

const AdminDashBoard = () => {
  return (
    <Fragment>
      <div className={styles["admin__dashboard__container"]}>
        <h3>AdminDashBoard</h3>
        <AddRoom />
      </div>
    </Fragment>
  );
};

export default AdminDashBoard;
