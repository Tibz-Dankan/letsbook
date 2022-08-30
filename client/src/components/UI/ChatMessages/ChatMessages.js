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
import { GoPerson } from "react-icons/go";
import { BsArrowLeftShort } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import { IconContext } from "react-icons/";
import axios from "axios";
import ScrollToBottom from "react-scroll-to-bottom";
import styles from "./ChatMessages.module.scss";

const ChatMessages = ({ socket }) => {
  const [text, setText] = useState("");
  // TODO: consider putting messages in a javascript array
  // E.g // let messages = [];
  const [messages, setMessages] = useState([]);
  const effectRan = useRef(false);
  const authToken = useSelector((state) => state.auth.token);
  const imageUrl = useSelector((state) => state.users.chatWithUser.image_url);
  const chatWithUserId = useSelector(
    (state) => state.users.chatWithUser.user_id
  );
  const chatWithUserRole = useSelector(
    (state) => state.users.chatWithUser.user_role
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

  // selecting element and giving it a class so
  // as it can take up styles defined in that class
  const getElementSetClassName = () => {
    const element = document.getElementById("message");
    // element.className = "my__message";
    element.style.backgroundColor = "hsl(206, 50%, 36%)";
  };

  const scrollToBottom = () => {
    // window.scrollTo(0, 0);
    window.scrollTo(1, 1);
  };

  // function to send text message to the server
  const msgObject = {
    chatRoomId: generateChatRoomId(chatWithUserId, currentUserId),
    sender_Id: currentUserId,
    recipientId: chatWithUserId,
    date: JSON.stringify({ date: new Date(Date.now()) }),
    message: text,
  };
  const sendTextMessage = async (event) => {
    event.preventDefault();
    if (text === "") return;
    socket.emit("sendMessage", msgObject);
    await setMessages((msgList) => [...msgList, msgObject]);
    scrollToBottom();
    setText("");
    // getElementSetClassName();
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
        <div className={styles["chat__Message__container__inner"]}>
          <section className={styles["chat__message__header"]}>
            <Link
              to="/chat"
              onClick={() => dispatch(clearChatRoomAndLocalStorage())}
              className={styles["link__to__chat__list"]}
            >
              <IconContext.Provider value={{ size: "2em" }}>
                <BsArrowLeftShort />
              </IconContext.Provider>
            </Link>
            {/* <div className={styles["image__icon__container"]}> */}
            <div>
              {!useSelector((state) => state.users.chatWithUser.image_url) && (
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
            <div className={styles["user__role"]}>
              {chatWithUserRole === "user" ? (
                <span className={styles["client__role"]}>Client</span>
              ) : (
                <span className={styles["customer__support__role"]}>
                  Customer Support
                </span>
              )}
            </div>
            <div className={styles["chat__with__user__name"]}>
              <p>
                {useSelector((state) => state.users.chatWithUser.user_name)}
              </p>
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
            {/* TODO: add sync loader */}
            <ScrollToBottom>
              {messages.map((msgObject, index) => {
                return (
                  <div
                    // key={new Date(JSON.parse(msgObject.date).date)}
                    key={index}
                    id={styles["message"]}
                    className={
                      currentUserId === msgObject.sender_id
                        ? styles["my__message"]
                        : styles["another__persons___message"]
                    }
                  >
                    <span className={styles["msg"]}>{msgObject.message}</span>
                    <div className={styles["date__time__container"]}>
                      <span className={styles["time"]}>
                        {getTime(msgObject.date)}
                      </span>
                      <span className={styles["date"]}>
                        {getDateString(msgObject.date)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </ScrollToBottom>
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
              placeholder="Message"
              required
            />
            <div
              onClick={(e) => sendTextMessage(e)}
              className={styles["button__icon__container"]}
            >
              <IconContext.Provider
                value={{
                  color: "hsl(266, 50%, 65%)",
                  size: "3em",
                  className: styles["send__icon"],
                }}
              >
                <IoMdSend />
              </IconContext.Provider>
            </div>
            {/* <button
              onClick={(e) => sendTextMessage(e)}
              className={styles["button__icon__container"]}
            >
              &#9658;
            </button> */}
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ChatMessages;
