const express = require("express");
const router = express.Router();
const {
  signupValidation,
  loginValidation,
} = require("../middleware/validateUser");
const { signupController, loginController } = require("../controller/authUser");

router.post("/signup", signupValidation, signupController);
router.post("/login", loginValidation, loginController);

module.exports = router;
