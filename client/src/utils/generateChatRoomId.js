export const generateChatRoomId = (currentUserId, chatWithId) => {
  const areParametersNumbers =
    Number.isInteger(currentUserId) && Number.isInteger(chatWithId);
  if (areParametersNumbers === false) return;
  if (currentUserId > chatWithId) {
    return "ctR" + chatWithId + "&" + currentUserId + "td";
  } else {
    return "ctR" + currentUserId + "&" + chatWithId + "td";
  }
};
