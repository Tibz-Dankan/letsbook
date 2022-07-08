import { notificationActions } from "../reducers/notification";

export const hideNotificationModal = () => {
  return async (dispatch) => {
    await dispatch(notificationActions.hideNotification());
  };
};
