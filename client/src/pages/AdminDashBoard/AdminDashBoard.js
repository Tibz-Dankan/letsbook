import React, { Fragment } from "react";
import AddRoom from "../../components/UI/AddRoom/AddRoom";
import GetStaffTokens from "../../components/UI/GetStaffTokens/GetStaffTokens";
import GetAllBookings from "../../components/UI/GetAllBookings/GetAllBookings";
import styles from "./AdminDashBoard.module.scss";

const AdminDashBoard = () => {
  return (
    <Fragment>
      <div className={styles["admin__dashboard__container"]}>
        <h3>AdminDashBoard</h3>
        <AddRoom />
        <br /> {/*To be removed*/}
        <br /> {/*To be removed*/}
        <GetStaffTokens />
        {/* TODO: Component get all the current bookings */}
        <GetAllBookings />
        {/* TODO: Component to upload image */}
      </div>
    </Fragment>
  );
};

export default AdminDashBoard;
