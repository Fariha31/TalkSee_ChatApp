const express = require("express");
const router = express.Router();
const {
  signupValidation,
  loginValidation,
  resetPasswordValidation,
  profileSetupValidation

} = require("../middleware/validateUser");
const { activationController, 
  loginController,
  signupVerificationController,
  resetPasswordController, 
  forgotPasswordController ,
   getMyAccountController,
   profileSetupController ,
  updateProfileSetupController} = require("../controller/authUser");
router.post("/signup", signupValidation, signupVerificationController);
router.post("/activation",activationController)
router.post("/login", loginValidation, loginController);
router.put("/forgot-password",forgotPasswordController);
router.put("/reset-password",resetPasswordValidation,resetPasswordController);
router.post("/profile-setup" ,profileSetupValidation,profileSetupController)
router.get("/my-account/:id"  ,getMyAccountController);
router.put("/update-profile-setup/:id",updateProfileSetupController)
module.exports = router;
