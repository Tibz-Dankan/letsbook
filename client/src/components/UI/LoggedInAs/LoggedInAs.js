import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { IconContext } from "react-icons";
import styles from "./LoggedInAs.module.scss";
import LogOut from "../LogOut/LogOut";

const LoggedInAs = () => {
  const userName = useSelector((state) => state.auth.user.userName);
  const userImage = useSelector((state) => state.auth.user.userImageUrl);
  const [showChevronDownIcon, setShowChevronDownIcon] = useState(true);

  const showChevronDownOrUp = () => {
    switch (showChevronDownIcon) {
      case true:
        setShowChevronDownIcon(!showChevronDownIcon);
        break;
      case false:
        setShowChevronDownIcon(!showChevronDownIcon);
        break;
      default:
    }
  };

  return (
    <Fragment>
      <div className={styles["logged__in__as__container"]}>
        <div className={styles["user__data__container"]}>
          <div className={styles["user__image__container"]}>
            {userImage ? (
              <img
                src={"some-image-url"}
                alt="profile-image"
                className={styles["user__image"]}
              />
            ) : (
              <IconContext.Provider
                value={{ color: "blue", className: "global-class-name" }}
              >
                <div
                  onClick={() => showChevronDownOrUp()}
                  className={styles["image__icon__container"]}
                >
                  <CgProfile className={styles["image__icon"]} />
                </div>
              </IconContext.Provider>
            )}
          </div>
          <div className={styles["user__name__container"]}>
            <span>{userName}</span>
          </div>
          <IconContext.Provider
            value={{ color: "blue", className: "global-class-name" }}
          >
            <div
              onClick={() => showChevronDownOrUp()}
              className={styles["chevron__icon__container"]}
            >
              {showChevronDownIcon ? (
                <GoChevronDown className={styles["chevron__down__icon"]} />
              ) : (
                <GoChevronUp className={styles["chevron__up__icon"]} />
              )}
            </div>
            {!showChevronDownIcon && (
              <div className={styles["log__out__container"]}>
                <LogOut />
              </div>
            )}
          </IconContext.Provider>
        </div>
      </div>
    </Fragment>
  );
};

export default LoggedInAs;
