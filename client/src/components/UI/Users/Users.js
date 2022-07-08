/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FadeLoader } from "react-spinners";
import ChatList from "../ChatList/ChatList";
import styles from "./Users.module.scss";
import { getUsers } from "../../../store/actions/users";
import { log } from "../../../utils/consoleLog";

const Users = ({ socket }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.auth.user.userId);
  const authToken = useSelector((state) => state.auth.token);
  const effectRan = useRef(false);

  const getRegisteredUsers = async () => {
    if (!user_id) return;
    try {
      setIsLoading(true);
      await dispatch(getUsers(user_id, authToken));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      log("error msg: " + error.message);
    }
  };

  useEffect(() => {
    if (effectRan.current === false) {
      getRegisteredUsers();
      return () => {
        effectRan.current = true;
      };
    }
  }, []);

  return (
    <Fragment>
      <div className={styles["users__container"]}>
        {isLoading && (
          <div className={styles["fade__loader__container"]}>
            <FadeLoader className={styles["fade__loader"]} />
          </div>
        )}
        <ChatList socket={socket} />
      </div>
    </Fragment>
  );
};

export default Users;
