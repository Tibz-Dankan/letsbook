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
// TODO: consider joining tables in order to include the image url
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
User.createStaffToken = (
  token,
  dateOfGeneration,
  usedOn,
  generatedBy,
  usedBy,
  isValid
) => {
  return db.query(
    "INSERT INTO staff_token(token, date_of_generation, used_on, generated_by,used_by,is_valid) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
    [token, dateOfGeneration, usedOn, generatedBy, usedBy, isValid]
  );
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
    "UPDATE staff_token SET is_valid = false WHERE token = $1 RETURNING *",
    [token]
  );
};

// Insert user image url
User.saveUserImageUrl = (userId, imageUrl) => {
  return db.query(
    "INSERT INTO user_image_urls( user_id, user_image_url) VALUES($1,$2)",
    [userId, imageUrl]
  );
};

// update user image url
User.updateUserImageUrl = (userId, imageUrl) => {
  return db.query(
    "UPDATE user_image_urls SET user_image_url = $1 WHERE user_id = $2",
    [imageUrl, userId]
  );
};
// Get user image url
User.getUserImageUrl = (userId) => {
  return db.query("SELECT * FROM user_image_urls WHERE user_id = $1", [userId]);
};

module.exports = User;
