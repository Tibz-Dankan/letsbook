import React, { Fragment } from "react";
import AddRoom from "../../components/UI/AddRoom/AddRoom";
import GetStaffTokens from "../../components/UI/GetStaffTokens/GetStaffTokens";
import GetAllBookings from "../../components/UI/GetAllBookings/GetAllBookings";
import styles from "./AdminDashBoard.module.scss";

const AdminDashBoard = () => {
  return (
    <Fragment>
      <div className={styles["admin__dashboard__container"]}>
        {/* TODO: Component get all the current bookings */}
        <GetAllBookings />
        <br /> {/*To be removed*/}
        <br /> {/*To be removed*/}
        <GetStaffTokens />
        <br /> {/*To be removed*/}
        <br /> {/*To be removed*/}
        <AddRoom />
        <br /> {/*To be removed*/}
        <br /> {/*To be removed*/}
      </div>
    </Fragment>
  );
};

export default AdminDashBoard;
