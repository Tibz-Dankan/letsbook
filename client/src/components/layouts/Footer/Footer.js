import React, { Fragment } from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <Fragment>
      {/* <div className={styles["footer"]}> */}
      <footer className={styles["footer"]}>
        <p>Copyright &copy; 2022 LetsBook. All rights reserved</p>
      </footer>
      {/* </div> */}
    </Fragment>
  );
};

export default Footer;
