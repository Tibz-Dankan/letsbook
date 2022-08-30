/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { authenticate } from "./store/actions/auth";
import { baseUrl } from "./store/appStore";
import Home from "./pages/Home/Home";
import Chat from "./pages/Chat/Chat";
import About from "./pages/About/About";
import ChatRoom from "./pages/ChatRoom/ChatRoom";
import Booking from "./pages/Booking/Booking";
import AdminDashBoard from "./pages/AdminDashBoard/AdminDashBoard";
import Staff from "./pages/Staff/Staff";
import Payment from "./pages/Payment/Payment";
import GeneralHeader from "./components/layouts/GeneralHeader/GeneralHeader";
import SideBar from "./components/layouts/SideBar/SideBar";
import "./App.scss";
import { log } from "./utils/consoleLog";

function App() {
  const dispatch = useDispatch();
  const socket = io.connect(baseUrl);
  // let socket;

  // TODO: create a room component showing all the available rooms
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  log("In the main app component");

  const userName = useSelector(
    (state) => state.auth.user && state.auth.user.userName
  );
  const userRole = useSelector(
    (state) => state.auth.user && state.auth.user.userRole
  );

  const userDataFromStorage = JSON.parse(localStorage.getItem("userData"));
  const navigationTypeReload =
    performance.getEntriesByType("navigation")[0].type === "reload";

  // update the redux store on page reload
  if (navigationTypeReload && userDataFromStorage) {
    const { user, token } = userDataFromStorage;
    dispatch(authenticate(user, token));
  }

  // useEffect(() => {
  //   const tryLogin = () => {
  //     const userData = localStorage.getItem("userData");
  //     const parsedUserData = JSON.parse(userData);
  //     if (!userData) {
  //       log("no data found");
  //       return (
  //         <Route path="/" element={<Navigate to="/" replace />} />
  //       );
  //     }
  //     const { user, token } = parsedUserData;

  //     if (!token || !user) {
  //       log("no token or user");
  //       return (
  //         <Route path="/" element={<Navigate to="/" replace />} />
  //       );
  //     }

  //     dispatch(authenticate(user, token));
  //   };
  //   tryLogin();
  // }, [dispatch]);

  return (
    <div className="app">
      <BrowserRouter>
        {!isLoggedIn && (
          <Routes>
            <Fragment>
              <Route path="/" element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="staff-signup" element={<Staff />} />
              <Route path="login" element={<Navigate to="/" replace />} />
              <Route path="signup" element={<Navigate to="/" replace />} />
              <Route path="login" element={<Navigate to="/" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Fragment>
          </Routes>
        )}

        {isLoggedIn && (
          <Fragment>
            <div className="pages">
              <SideBar />
              <Routes>
                <Route
                  path="booking"
                  element={
                    <div className="pages__component">
                      <GeneralHeader title={"Booking"} />
                      <Booking />
                    </div>
                  }
                />
                <Route
                  path="home"
                  element={
                    <div className="pages__component">
                      <GeneralHeader
                        title={`Welcome  ${userName ? userName : ""}`}
                      />
                      <Booking />
                    </div>
                  }
                />
                <Route
                  path="chat"
                  element={
                    <div className="pages__component">
                      <GeneralHeader title={"Chat"} />
                      <Chat socket={socket} />
                    </div>
                  }
                />
                <Route
                  path="chat-room"
                  element={
                    <div className="pages__component">
                      <GeneralHeader title={"ChatRoom"} />
                      <ChatRoom socket={socket} />
                    </div>
                  }
                />
                <Route
                  path="payment"
                  element={
                    <div className="pages__component">
                      <GeneralHeader title={"Payment"} />
                      <Payment />
                    </div>
                  }
                />
                {userRole === "manager" && (
                  <Route
                    path="admin"
                    element={
                      <div className="pages__component">
                        <GeneralHeader title={"Admin"} />
                        <AdminDashBoard />
                      </div>
                    }
                  />
                )}
                <Route
                  path="about"
                  element={
                    <div className="pages__component">
                      <GeneralHeader title={"About"} />
                      <About />
                    </div>
                  }
                />
                <Route path="/" element={<Navigate to="/booking" replace />} />
                <Route path="*" element={<Navigate to="/booking" replace />} />
              </Routes>
            </div>
          </Fragment>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
