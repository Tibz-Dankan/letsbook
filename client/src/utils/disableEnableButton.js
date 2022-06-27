export const disableEnableButton = (buttonId, boolean) => {
  if (!buttonId) return;
  document.getElementById(buttonId).disabled = boolean;
};
