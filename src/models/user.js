const db = require("../database/dbConfig");

const User = {};

// create user
User.createUser = (
  userName,
  email,
  country,
  hashedPassword,
  isVerifiedEmail,
  userVerifyToken,
  userRole
) => {
  return db.query(
    "INSERT INTO users(user_name, email, country, password, is_verified_email, user_verify_token, user_role) VALUES($1,$2,$3,$4,$5,$6,$7)  RETURNING *",
    [
      userName,
      email,
      country,
      hashedPassword,
      isVerifiedEmail,
      userVerifyToken,
      userRole,
    ]
  );
};

// Get user by Id
User.getUserById = (userId) => {
  return db.query("SELECT * FROM users WHERE user_id =$1", [userId]);
};

// Get user by Email
User.getUserByEmail = (email) => {
  return db.query("SELECT * FROM users WHERE email =$1", [email]);
};
// Get user by verify_token
User.getUserByToken = (token) => {
  return db.query("SELECT * FROM users WHERE user_verify_token =$1", [token]);
};

// Get all users
User.getAllUsers = () => {
  return db.query("SELECT * FROM users");
};

// Get all users except the current logged in user
User.getSupportTeam = () => {
  return db.query("SELECT * FROM users WHERE user_role = 'support personnel'");
};

// update password
User.updatePassword = (newHashedPassword, userId, userEmail) => {
  return db.query(
    "UPDATE users SET password = $1 WHERE user_id = $2 AND email =$3 RETURNING *",
    [newHashedPassword, userId, userEmail]
  );
};

// update verify Token
User.updateVerifyToken = (userId, verifyToken) => {
  return db.query(
    "UPDATE users SET user_verify_token = $1 WHERE user_id = $2 RETURNING *",
    [verifyToken, userId]
  );
};

// create staff token
User.createStaffToken = (token, generatedBy, dateOfGeneration) => {
  "INSERT INTO staff_token(token, staff_token, generated_by) VALUES($1,$2,$3)  RETURNING *",
    [token, generatedBy, dateOfGeneration];
};

// get staff token
User.getAllStaffTokens = () => {
  return db.query("SELECT * FROM staff_token");
};

// get staff token
User.getStaffToken = (token) => {
  return db.query("SELECT * FROM staff_token WHERE token = $1", [token]);
};

// invalidate token
User.invalidateToken = (token) => {
  return db.query(
    "UPDATE staff_token SET is_valid = false WHERE token = $2 RETURNING *",
    [token]
  );
};

module.exports = User;
