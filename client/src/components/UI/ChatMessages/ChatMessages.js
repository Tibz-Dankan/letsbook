/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { log } from "../../../utils/consoleLog";
import { baseUrl } from "../../../store/appStore";
import { generateChatRoomId } from "../../../utils/generateChatRoomId";
import { clearChatRoomAndLocalStorage } from "../../../store/actions/users";
import { IoMdVideocam } from "react-icons/io";
import { IoCallSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { GiPlayButton } from "react-icons/gi";
import { IconContext } from "react-icons";
import axios from "axios";
import styles from "./ChatMessages.module.scss";

const ChatMessages = ({ socket }) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const effectRan = useRef(false);
  const authToken = useSelector((state) => state.auth.token);
  const imageUrl = useSelector((state) => state.users.chatWithUser.image_url);
  const chatWithUserId = useSelector(
    (state) => state.users.chatWithUser.user_id
  );
  const currentUserId = useSelector((state) => state.auth.user.userId);
  const chatRoomId = generateChatRoomId(chatWithUserId, currentUserId);
  log("chat room Id: " + chatRoomId); // to be removed
  const dispatch = useDispatch();

  const getChatMessages = async () => {
    const ChatRoomId = generateChatRoomId(currentUserId, chatWithUserId);
    if (!chatRoomId) {
      // dispatch alert msg with a reload button // should be a function
      alert("No chat Room Id");
      return;
    }
    try {
      const response = await axios.get(
        `${baseUrl}/chat-messages/${ChatRoomId}`,
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      );
      console.log("chat messages from the server");
      console.log(response);
      if (response.data.errorMessage) {
        //   Dispatch an alert msg in the model // should be a function
        throw new Error(response.data.errorMessage);
      }
      setMessages(response.data.data);
    } catch (error) {
      log("Error msg:" + error.message);
    }
  };

  useEffect(() => {
    if (effectRan.current === false) {
      getChatMessages();
      console.log("fetching chat messages");
      return () => {
        effectRan.current = true;
      };
    }
  }, []);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  // provides format  -> Sun Jul 03 2022;
  const getDateString = (dateObject) => {
    const date = new Date(JSON.parse(dateObject).date);
    return date.toDateString();
  };
  //provides format  -> 3:47 AM
  const getTime = (dateObject) => {
    const date = new Date(JSON.parse(dateObject).date);
    return date.toLocaleTimeString("en-Us", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  // function to send text message to the server
  const msgObject = {
    chatRoomId: generateChatRoomId(chatWithUserId, currentUserId),
    senderId: currentUserId,
    recipientId: chatWithUserId,
    date: JSON.stringify({ date: new Date(Date.now()) }),
    message: text,
  };
  const sendTextMessage = (event) => {
    event.preventDefault();
    if (text === "") return;
    socket.emit("sendMessage", msgObject);
    setMessages((msgList) => [...msgList, msgObject]);
    setText("");
  };

  // Getting the text message from the server(backend)
  useEffect(() => {
    if (effectRan.current === false) {
      socket.on("receiveMessage", (msg) => {
        log("chat messages: " + msg);
        setMessages((msgList) => [...msgList, msg]);
      });
      return () => {
        effectRan.current = true;
      };
    }
  }, [socket]);

  return (
    <Fragment>
      <div className={styles["chat__Message__container"]}>
        <Link
          to="/chat"
          onClick={() => dispatch(clearChatRoomAndLocalStorage())}
          className={styles["chat__msg"]}
        >
          <h2>Back</h2>
        </Link>
        <section className={styles["chat__message__header"]}>
          <div className={styles["image___icon__container"]}>
            {!useSelector((state) => state.users.chatWithUser.image_url) && (
              <IconContext.Provider value={{ size: "2.5em" }}>
                <CgProfile className={styles["image__icon"]} />
              </IconContext.Provider>
            )}
            {useSelector((state) => state.users.chatWithUser.image_url) && (
              <div className={styles["user__image__container"]}>
                <img
                  src={imageUrl}
                  alt="Profile pic"
                  className={styles["user__image"]}
                />
              </div>
            )}
          </div>
          <div className={styles["chat__with__user__name"]}>
            <p>{useSelector((state) => state.users.chatWithUser.user_name)}</p>
          </div>
          <div className={styles["chat__with__calls__container"]}>
            <div className={styles["video__call"]}>
              <IconContext.Provider value={{ size: "1.3em" }}>
                <IoMdVideocam />
              </IconContext.Provider>
            </div>
            <div className={styles["audio__call"]}>
              <IconContext.Provider value={{ size: "1.3em" }}>
                <IoCallSharp />
              </IconContext.Provider>
            </div>
          </div>
        </section>
        <section className={styles["message__container"]}>
          <span>Messages Here</span>
          {messages.map((msgObject) => {
            return (
              <div
                key={new Date(JSON.parse(msgObject.date).date)}
                id={styles["message"]}
                className={
                  currentUserId === msgObject.senderId
                    ? styles["my__message"]
                    : styles["other__message"]
                }
              >
                <span className={styles["msg"]}>{msgObject.message} </span>
                <div className={styles["date__time__container"]}>
                  <span className={styles["date"]}>
                    {getDateString(msgObject.date)}
                  </span>
                  <span className={styles["time"]}>
                    {getTime(msgObject.date)}
                  </span>
                </div>
              </div>
            );
          })}
        </section>
        <form className={styles["form__input"]}>
          <input
            type="text"
            value={text}
            className={styles["form__input__field"]}
            onChange={(event) => handleTextChange(event)}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                sendTextMessage();
              }
            }}
            required
          />
          <div
            onClick={(e) => sendTextMessage(e)}
            className={styles["button__icon__container"]}
          >
            <IconContext.Provider value={{ size: "3em" }}>
              <GiPlayButton />
            </IconContext.Provider>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default ChatMessages;
