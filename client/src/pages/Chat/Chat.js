import React, { Fragment } from "react";
import styles from "./Chat.module.scss";
import Users from "../../components/UI/Users/Users";

const Chat = ({ socket }) => {
  return (
    <Fragment>
      <div className={styles["chat-page"]}>
        <Users socket={socket} />
      </div>
    </Fragment>
  );
};

export default Chat;
