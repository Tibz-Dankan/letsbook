const express = require("express");
const { verifyJwtToken } = require("../utils/verifyJwtToken");
const {
  signup,
  login,
  verifyStaffToken,
  generateStaffToken,
  getAllStaffTokens,
} = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-staff-token", verifyStaffToken);
router.post(
  "/generate-staff-token/:generatedByUserId",
  verifyJwtToken,
  generateStaffToken
);
router.get("/get-staff-tokens", verifyJwtToken, getAllStaffTokens);

// TODO: forgot password, update password

module.exports = router;
