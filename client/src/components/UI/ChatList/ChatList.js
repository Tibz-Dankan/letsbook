import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "./ChatList.module.scss";
import { IconContext } from "react-icons";
import { CgProfile } from "react-icons/cg";
import { SiGooglemessages } from "react-icons/si";
import { useSelector, useDispatch } from "react-redux";
import { updateChatWithUserData } from "../../../store/actions/users";
import { generateChatRoomId } from "../../../utils/generateChatRoomId";

const ChatList = ({ socket }) => {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.auth.user.userId);

  // Join chat room
  const joinRoom = async (chatWithUser) => {
    const chatRoomId = generateChatRoomId(currentUserId, chatWithUser.user_id);
    await dispatch(updateChatWithUserData(chatWithUser));
    socket.emit("joinRoom", chatRoomId);
  };

  return (
    <Fragment>
      <div className={styles["chat__list__wrapper"]}>
        {users.map((user) => {
          return (
            <div key={user.user_id} className={styles["chat__list"]}>
              {!user.image_url && (
                <IconContext.Provider value={{ size: "2.5em" }}>
                  <div className={styles["image__icon__container"]}>
                    <CgProfile className={styles["image__icon"]} />
                  </div>
                </IconContext.Provider>
              )}
              {user.image_url && (
                <div className={styles["user__image"]}>
                  <img src={user.image_url} alt="Profile pic" />
                </div>
              )}
              <div className={styles["user__name"]}>{user.user_name}</div>
              <Link to="/chat-room">
                <div
                  onClick={() => joinRoom(user)}
                  className={styles["message__icon"]}
                >
                  <IconContext.Provider value={{ size: "1.5em" }}>
                    <SiGooglemessages />
                  </IconContext.Provider>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default ChatList;
