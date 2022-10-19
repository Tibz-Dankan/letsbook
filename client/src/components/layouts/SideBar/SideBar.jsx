import { Fragment } from "react";
import styles from "./SideBar.module.scss";
import { IconContext } from "react-icons";
import { ImHome } from "react-icons/im";
import { BsFillChatTextFill, BsBookmarkPlusFill } from "react-icons/bs";
import { RiAdminFill } from "react-icons/ri";
// import { MdPayment } from "react-icons/md";
import { MdOutlineBedroomParent } from "react-icons/md";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const userRole = useSelector(
    (state) => state.auth.user && state.auth.user.userRole
  );
  return (
    <Fragment>
      <div className={styles["side-bar"]}>
        <div className={styles["side-bar__logo-box"]}>
          <h3 className={styles["side-bar__heading"]}>LetsBook</h3>
          <span className={styles["side-bar__tag-line"]}>
            Enjoy your booking experience
          </span>
        </div>
        <ul className={styles["side-bar__list"]}>
          {userRole === "manager" && (
            <li className={styles["side-bar__list--item"]}>
              <NavLink to="/admin" className={styles["side-bar__list--link"]}>
                <IconContext.Provider
                  value={{
                    color: "hsl(0, 0%, 90%)",
                    size: "1.3em",
                    className: styles["side-bar__icon"],
                  }}
                >
                  <RiAdminFill />
                </IconContext.Provider>
                <span>Admin</span>
              </NavLink>
            </li>
          )}
          <li className={styles["side-bar__list--item"]}>
            <NavLink to="/home" className={styles["side-bar__list--link"]}>
              <IconContext.Provider
                value={{
                  color: "hsl(0, 0%, 90%)",
                  size: "1.3em",
                  className: styles["side-bar__icon"],
                }}
              >
                <ImHome />
              </IconContext.Provider>
              <span>Home</span>
            </NavLink>
          </li>
          <li
            className={`${styles["side-bar__list--item"]}  ${styles["side-bar__list--item--active"]}`}
          >
            <NavLink to="/booking" className={styles["side-bar__list--link"]}>
              <IconContext.Provider
                value={{
                  color: "hsl(0, 0%, 90%)",
                  size: "1.3em",
                  className: styles["side-bar__icon"],
                }}
              >
                <BsBookmarkPlusFill />
              </IconContext.Provider>
              <span>Book</span>
            </NavLink>
          </li>
          <li className={styles["side-bar__list--item"]}>
            <NavLink to="/chat" className={styles["side-bar__list--link"]}>
              <IconContext.Provider
                value={{
                  color: "hsl(0, 0%, 90%)",
                  size: "1.3em",
                  className: styles["side-bar__icon"],
                }}
              >
                <BsFillChatTextFill />
              </IconContext.Provider>
              <span>Chat</span>
            </NavLink>
          </li>
          <li className={styles["side-bar__list--item"]}>
            <NavLink to="/rooms" className={styles["side-bar__list--link"]}>
              <IconContext.Provider
                value={{
                  color: "hsl(0, 0%, 90%)",
                  size: "1.3em",
                  className: styles["side-bar__icon"],
                }}
              >
                <MdOutlineBedroomParent />
              </IconContext.Provider>
              <span>Rooms</span>
            </NavLink>
          </li>
          {/* <li className={styles["side-bar__list--item"]}>
            <NavLink to="/payment" className={styles["side-bar__list--link"]}>
              <IconContext.Provider
                value={{
                  color: "hsl(0, 0%, 90%)",
                  size: "1.3em",
                  className: styles["side-bar__icon"],
                }}
              >
                <MdPayment />
              </IconContext.Provider>
              <span>Pay</span>
            </NavLink>
          </li> */}
        </ul>
      </div>
    </Fragment>
  );
};

export default SideBar;
