import { baseUrl } from "../appStore";
import axios from "axios";
// import { roomActions } from "../reducers/room";
import { notificationActions } from "../reducers/notification";
import { log } from "../../utils/consoleLog";

// add room
// get rooms
// edit room
// delete room

// deleteRoom
// roomId

export const editRoom = (
  roomId,
  roomName,
  roomDescription,
  noOfBeds,
  price,
  roomCapacityNum,
  token
) => {
  return async (dispatch) => {
    const response = await axios.put(
      `${baseUrl}/update-room/${roomId}`,
      {
        roomName: roomName,
        roomDescription: roomDescription,
        noOfBeds: noOfBeds,
        price: price,
        roomCapacityNum: roomCapacityNum,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    log(response);
    if (response.data.errorMessage) {
      await dispatch(
        notificationActions.showNotification({
          notificationMsg: response.data.errorMessage,
        })
      );
      throw new Error(response.data.errorMessage);
    }
    await dispatch(
      notificationActions.showNotification({
        notificationMsg: "Room updated successfully",
      })
    );
  };
};

export const deleteRoom = (roomId, token) => {
  return async (dispatch) => {
    const response = await axios.delete(`${baseUrl}/delete-room/${roomId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    log(response);
    if (response.data.errorMessage) {
      await dispatch(
        notificationActions.showNotification({
          notificationMsg: response.data.errorMessage,
        })
      );
      throw new Error(response.data.errorMessage);
    }
    await dispatch(
      notificationActions.showNotification({
        notificationMsg: response.data.errorMessage,
      })
    );
  };
};
