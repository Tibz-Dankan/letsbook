const AppError = (message, statusCode) => {
  message;
  statusCode;
  let status;
  const statusCodeString = statusCode.toString();
  status = `${statusCodeString}`.startsWith("4") ? "fail" : "error";
  Error.captureStackTrace(this, AppError);
};
// AppError("The message error", 400);

module.exports = { AppError };
