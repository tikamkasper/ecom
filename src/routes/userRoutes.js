const { Router } = require("express");
const { verifyJWT } = require("../middlewares/authMiddleware.js");
const {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
} = require("../controllers/userController");

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(verifyJWT, logoutUser); //secured routes

router.route("/refreshToken").post(refreshAccessToken);
router.route("/changePassword").post(verifyJWT, changeCurrentPassword); //secured routes
router.route("/currentUser").get(verifyJWT, getCurrentUser); //secured routes

module.exports = router;
