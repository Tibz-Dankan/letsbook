const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailExistence = require("email-existence");
const crypto = require("crypto");
const { AppError } = require("../utils/error");
const { json } = require("express");
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
  country,
  password,
  isVerified,
  token,
  userRole
) => {
  const user = await User.getUserByEmail(email);
  if (user.rows[0]) return res.json({ errorMessage: "Email already exists" });
  await User.createUser(
    name,
    email,
    country,
    password,
    isVerified,
    token,
    userRole
  );
  res.status(201).json({ status: "success" });
};

const signup = async (req, res, next) => {
  const userName = req.body.userName;
  const email = req.body.email;
  const country = req.body.countrySelected;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const userRole = req.body.userRole;
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
      country,
      hashedPassword,
      isVerifiedEmail,
      token,
      userRole
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
    userRole: user.rows[0].user_role,
  };
  createSendToken(userObject, 200, res);
};

const verifyStaffToken = async (req, res, next) => {
  const staffToken = req.body.staffToken;

  if (!staffToken) return res.json({ errorMessage: "Please provide token" });
  if (staffToken === process.env.STAFF_VERIFICATION_TOKEN) {
    return res.status(200).json({ status: "success" });
  }
  const token = await User.getStaffToken(staffToken);
  console.log(token.rows);
  if (!token.rows[0]) {
    return res.json({ errorMessage: "No token found" });
  }
  if (!token.rows[0].token) {
    return res.json({ errorMessage: "Incorrect token" });
  }
  if (token.rows[0].is_valid === false) {
    // if (!token.rows[0].is_valid) { // TODO: to be tested
    return res.json({ errorMessage: "Token already used" });
  }
  await User.invalidateToken(token);
  return res.status(200).json({ status: "success" });
};

const generateStaffToken = async (req, res, next) => {
  const token = crypto.randomBytes(16).toString("hex");
  const dateOfGeneration = req.body.dateOfGeneration;
  const generatedByUserId = req.params.generatedByUserId;

  const user = await User.getUserById(generatedByUserId);

  if (user.rows[0].user_role !== "manager") {
    return res.json({ errorMessage: "Not authorized to generate token" });
  }
  await User.createStaffToken(token, generatedByUserId, dateOfGeneration);
  res.status(200).json({ status: "success" });
};

const getAllStaffTokens = async (req, res, next) => {
  const tokens = await User.getAllStaffTokens();
  if (!tokens.rows[0]) return res.json({ errorMessage: "No tokens found" });
  res.status(200).json(tokens.rows);
};

// TODO: forgot password, update password

module.exports = {
  signup,
  login,
  verifyStaffToken,
  generateStaffToken,
  getAllStaffTokens,
};
