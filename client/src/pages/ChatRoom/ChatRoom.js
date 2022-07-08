/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useRef } from "react";
import { usersActions } from "../../store/reducers/users";
import { useSelector, useDispatch } from "react-redux";
import { log } from "../../utils/consoleLog";
import { generateChatRoomId } from "../../utils/generateChatRoomId";
import ChatMessages from "../../components/UI/ChatMessages/ChatMessages";
import styles from "./ChatRoom.module.scss";

const ChatRoom = ({ socket }) => {
  const dispatch = useDispatch();
  const effectRan = useRef(false);

  const chatWithUserId = useSelector(
    (state) => state.users.chatWithUser.user_id
  );
  const currentUserId = useSelector((state) => state.auth.user.userId);

  const updateChatWithUserData = () => {
    dispatch(
      usersActions.chatWithUser({
        chatWithUser: JSON.parse(localStorage.getItem("chatWithUser")),
      })
    );
  };

  // update redux store and reconnect user to room on page reload
  if (performance.getEntriesByType("navigation")[0].type === "reload") {
    updateChatWithUserData();
    socket.emit("joinRoom", generateChatRoomId(currentUserId, chatWithUserId));
    log("Reloading...  Reconnecting user to the Room");
  }

  useEffect(() => {
    if (effectRan.current === false) {
      updateChatWithUserData();
      return () => {
        effectRan.current = true;
      };
    }
  }, []);

  return (
    <Fragment>
      <div className={styles["chat__room__container"]}>
        <ChatMessages socket={socket} />
      </div>
    </Fragment>
  );
};

export default ChatRoom;
