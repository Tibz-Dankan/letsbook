import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { authActions } from "./store/reducers/auth";
import { baseUrl } from "./store/appStore";
import Home from "./pages/Home/Home";
import Chat from "./pages/Chat/Chat";
import About from "./pages/About/About";
import ChatRoom from "./pages/ChatRoom/ChatRoom";
import styles from "./App.module.scss";

function App() {
  const dispatch = useDispatch();
  const socket = io.connect(baseUrl);

  const userDataFromStorage = JSON.parse(localStorage.getItem("userData"));
  const navigationTypeReload =
    performance.getEntriesByType("navigation")[0].type === "reload";

  // update the redux store on page reload
  if (navigationTypeReload && userDataFromStorage) {
    dispatch(
      authActions.authenticate({
        token: userDataFromStorage.token,
        user: userDataFromStorage.user,
      })
    );
  }

  return (
    <div className={styles["App"]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="chat" element={<Chat socket={socket} />} />
          <Route path="chat-room" element={<ChatRoom socket={socket} />} />
          <Route path="about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
