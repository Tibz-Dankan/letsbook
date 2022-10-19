import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "./ChatList.module.scss";
import { IconContext } from "react-icons";
import { GoPerson } from "react-icons/go";
import { BsFillChatTextFill } from "react-icons/bs";
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
      <div className={styles["chat__list__container"]}>
        <div className={styles["chat__list__container__inner"]}>
          {users.map((user) => {
            return (
              <div key={user.user_id} className={styles["chat__list"]}>
                {!user.image_url && (
                  <IconContext.Provider
                    value={{
                      color: "hsl(0, 0%, 60%)",
                      size: "2.5em",
                      className: styles["image__icon__container"],
                    }}
                  >
                    <GoPerson className={styles["image__icon"]} />
                  </IconContext.Provider>
                )}
                {user.image_url && (
                  <div className={styles["user__image"]}>
                    <img src={user.image_url} alt="Profile pic" />
                  </div>
                )}
                <div className={styles["user__role"]}>
                  {/*Role of user to chat with */}
                  {user.user_role === "user" ? (
                    <span className={styles["client__role"]}>Client</span>
                  ) : (
                    <span className={styles["customer__support__role"]}>
                      Customer Support
                    </span>
                  )}
                </div>
                <div className={styles["user__name"]}>{user.user_name}</div>
                <Link to="/chat-room">
                  <div
                    onClick={() => joinRoom(user)}
                    className={styles["message__icon__container"]}
                  >
                    <IconContext.Provider
                      value={{
                        color: "hsl(266, 50%, 65%)",
                        size: "1.3em",
                        className: styles["message__icon"],
                      }}
                    >
                      <BsFillChatTextFill />
                    </IconContext.Provider>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default ChatList;
