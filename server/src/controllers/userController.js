const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailExistence = require("email-existence");
const crypto = require("crypto");
const { AppError } = require("../utils/error");
require("dotenv").config();

const assignToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRETE_TOKEN);
};

const createSendToken = (user, statusCode, res) => {
  const token = assignToken(user.userId);

  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

// const checkEmailExistence = (email, next) => {
//   emailExistence.check(email, (error, response) => {
//     if (error)
//       return next(AppError("error occurred during email validation", 500));
//     if (!response) return next(AppError("Invalid email validation", 403));
//     console.log("Email Validation status: " + response);
//   });
// };

const createUserSendResponse = async (
  res,
  name,
  email,
  password,
  isVerified,
  token
) => {
  const user = await User.getUserByEmail(email);
  if (user.rows[0]) return res.json({ errorMessage: "Email already exists" });
  await User.createUser(name, email, password, isVerified, token);
  res.status(201).json({ status: "success" });
};

const signup = async (req, res, next) => {
  const userName = req.body.userName;
  const email = req.body.email;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const isVerifiedEmail = false;
  const token = crypto.randomBytes(16).toString("hex");
  // check email existence
  await emailExistence.check(email, async (error, response) => {
    if (error)
      return res.json({
        errorMessage: "An error occurred during email validation",
      });
    if (!response) return res.json({ errorMessage: "Invalid email" });
    createUserSendResponse(
      res,
      userName,
      email,
      hashedPassword,
      isVerifiedEmail,
      token
    );
    console.log("Email Validation status: " + response);
  });
};

const login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.getUserByEmail(email);
  if (!user.rows[0]) return res.json({ errorMessage: "Email does not exist" });

  if (!(await bcrypt.compare(password, user.rows[0].password))) {
    return res.json({ errorMessage: "Incorrect password" });
  }
  const userObject = {
    userId: user.rows[0].user_id,
    userName: user.rows[0].user_name,
    email: user.rows[0].email,
  };
  createSendToken(userObject, 200, res);
};

// TODO: forgot password, update password

module.exports = {
  signup,
  login,
};
