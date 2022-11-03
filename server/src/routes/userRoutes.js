const express = require("express");
const { verifyJwtToken } = require("../utils/verifyJwtToken");
const {
  signup,
  login,
  verifyStaffToken,
  generateStaffToken,
  getAllStaffTokens,
  uploadUserImage,
  updateUserImage,
} = require("../controllers/userController");
const { upload } = require("../utils/multer");

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
router.post(
  "/upload-user-image/:userId",
  verifyJwtToken,
  upload.none(),
  uploadUserImage
);
router.post(
  "/update-user-image/:userId",
  verifyJwtToken,
  upload.none(),
  updateUserImage
);

// TODO: forgot password, update password

module.exports = router;
