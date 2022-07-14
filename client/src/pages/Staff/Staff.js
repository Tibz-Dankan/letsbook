import React, { Fragment } from "react";
import StaffSignUp from "../../components/UI/StaffSignUp/StaffSignUp";
import VerifyStaffToken from "../../components/UI/VerifyStaffToken/VerifyStaffToken";
import styles from "./Staff.module.scss";

const Staff = () => {
  // TODO: global variable for showing either verifyStaffToken component or staffSignup component
  // And also cater for the token id from the backend
  return (
    <Fragment>
      <div className={styles["staff__container"]}>
        <VerifyStaffToken />
        <StaffSignUp />
      </div>
    </Fragment>
  );
};

export default Staff;
