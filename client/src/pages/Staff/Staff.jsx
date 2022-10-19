import React, { Fragment } from "react";
import StaffSignUp from "../../components/UI/StaffSignUp/StaffSignUp";
import VerifyStaffToken from "../../components/UI/VerifyStaffToken/VerifyStaffToken";
import { useSelector } from "react-redux";
import styles from "./Staff.module.scss";

const Staff = () => {
  const isValidStaffToken = useSelector(
    (state) => state.auth.isValidStaffSignUpToken
  );
  console.log(isValidStaffToken);

  return (
    <Fragment>
      <div className={styles["staff__signup"]}>
        <div className={styles["staff__signup__header"]}>
          <h3 className={styles["staff__signup__header--logo"]}>LETSBOOK</h3>
        </div>
        {!isValidStaffToken && (
          <div className={styles["staff__signup__component"]}>
            <span>
              To signup as staff member you need to provide a token provided the
              admin
            </span>
            <VerifyStaffToken />
          </div>
        )}
        {isValidStaffToken && (
          <div className={styles["staff__signup__component"]}>
            <span>
              You are signing up on LetsBook as a staff member, please provide
              your correct role. Good luck!
            </span>
            <StaffSignUp />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Staff;
