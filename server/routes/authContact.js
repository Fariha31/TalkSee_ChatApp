const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
 
router.get("/getContact", async (req, res) => {
  const contact = await User.find();
  return res.status(200).send(contact);
});

 
module.exports = router;