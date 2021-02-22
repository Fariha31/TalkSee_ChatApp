const { Signup } = require("../models/SignUp");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const sgMail = require('@sendgrid/mail');
const config = require("config");
exports.signupController = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const emailAlready = await Signup.findOne({ email });
    if (emailAlready) {
      return res.status(400).json({
        errorMessage: "Email Already exists",
      });
    }
    const newUser = new Signup();
    newUser.username = username;
    newUser.email = email;

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    console.log(newUser.password);
    await newUser.save();
    res.status(200).json({
      successMessage: "Successfully Registered",
    });
  } catch (err) {
    res.status(500).json({
      errorMessage: "Server Error",
    });
  }
};
exports.loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Signup.findOne({ email });
    if (!user) {
      return res.status(400).json({
        errorMessage: "User not registered",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        errorMessage: "Invalid password",
      });
    }
    const payload = {
      user: {
        _id: user._id,
      },
    };
    jwt.sign(payload, config.get("jwtPrivateKey"), (err, token) => {
      if (err) console.log("JWT error");
      const { _id, username, email, role } = user;
      res.json({
        token,
        user: { _id, username, email, role },
      });
    });
  } catch (err) {
    res.status(500).json({
      errorMessage: "Server Error in Controller",
    });
  }
};
