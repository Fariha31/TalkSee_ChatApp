const express = require("express");
const router = express.Router();
const {
  signupValidation,
  loginValidation,
  resetPasswordValidation

} = require("../middleware/validateUser");
const { activationController, loginController,signupVerificationController,resetPasswordController, forgotPasswordController } = require("../controller/authUser");
router.post("/signup", signupValidation, signupVerificationController);
router.post("/activation",activationController)
router.post("/login", loginValidation, loginController);
router.put("/forgot-password",forgotPasswordController);
router.put("/reset-password",resetPasswordValidation,resetPasswordController);
 
module.exports = router;
