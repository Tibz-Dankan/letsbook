import React, { Fragment } from "react";
import MobileMoney from "../MobileMoney/MobileMoney";
import CreditDebitCard from "../CreditDebitCard/CreditDebitCard";
import styles from "./Payment.module.scss";

const Payment = () => {
  return (
    <Fragment>
      <div className={styles["payment__container"]}>
        <MobileMoney />
        <br /> {/*To be removed*/}
        <CreditDebitCard />
      </div>
    </Fragment>
  );
};

export default Payment;
