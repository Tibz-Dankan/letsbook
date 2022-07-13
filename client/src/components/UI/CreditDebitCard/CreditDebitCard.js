import React, { Fragment, useState } from "react";
import styles from "./CreditDebitCard.module.scss";

const CreditDebitCard = () => {
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState(0);
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleNameOnCard = (event) => {
    setNameOnCard(event.target.value);
  };

  const handleCardNumber = (event) => {
    setCardNumber(event.target.value);
  };
  const handleExpiryDate = (event) => {
    setExpiryDate(event.target.value);
  };
  const handleCvv = (event) => {
    setCvv(event.target.value);
  };

  // TODO: api request function
  // TODO: handle submit card info

  return (
    <Fragment>
      <div className={styles["credit__debit__card__container"]}>
        <div className={styles["form__container"]}>
          <form className={styles["form"]}>
            <div className={styles["form__input__group"]}>
              <input
                type="text"
                className={styles["input__field"]}
                placeholder="Name on Card"
                value={nameOnCard}
                onChange={(event) => handleNameOnCard(event)}
                required
              />
            </div>
            <div className={styles["form__input__group"]}>
              <input
                type="text"
                className={styles["input__field"]}
                placeholder="Card Number"
                value={cardNumber}
                onChange={(event) => handleCardNumber(event)}
                required
              />
            </div>
            <div className={styles["expiry__date__cvv__container"]}>
              <div className={styles["form__input__group"]}>
                <input
                  type="text"
                  className={styles["input__field"]}
                  placeholder="Expiry date"
                  value={expiryDate}
                  onChange={(event) => handleExpiryDate(event)}
                  required
                />
              </div>
              <div className={styles["form__input__group"]}>
                <input
                  type="text"
                  className={styles["input__field"]}
                  placeholder="cvv"
                  value={cvv}
                  onChange={(event) => handleCvv(event)}
                  required
                />
              </div>
            </div>
            <div className={styles["form__button__container"]}>
              <button type="submit" className={styles["btn"]}>
                Pay
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default CreditDebitCard;
