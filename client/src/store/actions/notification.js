import { notificationActions } from "../reducers/notification";

export const hideNotificationModal = () => {
  return async (dispatch) => {
    await dispatch(notificationActions.hideNotification());
  };
};

export const showNotificationModal = (notificationMessage) => {
  return async (dispatch) => {
    await dispatch(
      notificationActions.showNotification({
        notificationMsg: notificationMessage,
      })
    );
  };
};
