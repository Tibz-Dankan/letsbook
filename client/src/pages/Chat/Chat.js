import React, { Fragment } from "react";
import styles from "./Chat.module.scss";
import ChatTextMessage from "../../components/UI/ChatTextMessage/ChatTextMessage";

const Chat = () => {
  return (
    <Fragment>
      <div className={styles["chat-page"]}>
        <h1>I will be chatting from here</h1>
        <ChatTextMessage />
      </div>
    </Fragment>
  );
};

export default Chat;
