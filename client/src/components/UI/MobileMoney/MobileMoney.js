import React, { Fragment, useState } from "react";
import styles from "./MobileMoney.module.scss";

const MobileMoney = () => {
  const [telPhoneNo, setTelPhoneNo] = useState("");
  const [amountOfMoney, setAmountOfMoney] = useState(0);

  const handleTelPhoneNo = (event) => {
    setTelPhoneNo(event.target.value);
  };
  const handleAmountOfMoney = (event) => {
    setAmountOfMoney(event.target.value);
  };

  // TODO: api request
  // TODO: handle submit mobile money

  return (
    <Fragment>
      <div className={styles["mobile__money__container"]}>
        <div className={styles["heading__logo__container"]}>
          <span>Mobile Money</span>
          <span>
            <img src={"url"} alt="mtn logo" />
          </span>
        </div>
        <div className={styles["form__container"]}>
          <form className={styles["form"]}>
            <div className={styles["form__input__group"]}>
              <input
                className={styles["input__field"]}
                // type="tel"
                type="number"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                name="phone"
                value={telPhoneNo}
                onChange={(event) => handleTelPhoneNo(event)}
                placeholder="Tel Number"
                required
              />
            </div>
            <div className={styles["form__input__group"]}>
              <input
                className={styles["input__field"]}
                type="number"
                data-type="currency" // under test
                value={amountOfMoney}
                onChange={(event) => handleAmountOfMoney(event)}
                placeholder="amount ugx"
                required
              />
            </div>
            <div className={styles["btn__container"]}>
              <button type="submit">Pay</button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default MobileMoney;
