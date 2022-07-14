const express = require("express");
// const { verifyToken } = require("../utils/verifyToken");
const {
  signup,
  login,
  verifyStaffToken,
} = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-staff-token", verifyStaffToken);
// router.post("/verify-user-email/:id", verifyUser); // to be removed

// TODO: forgot password, update password

module.exports = router;
