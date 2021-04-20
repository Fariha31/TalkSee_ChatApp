const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
 
router.get("/getContact", async (req, res) => {
  const contact = await User.find();
  return res.status(200).send(contact);
  //const users = User.find({ _id: { $ne: user._id } })
});
router.get("/get-contact/:id", async (req, res) => {
   try {
     const { friends } = await User.findById(req.params.id);
     const { friendRequests } = await User.findById(req.params.id);
     var ar=[];
     for(i =0; i <friends.length; i++)
         ar[i]=friends[i].id
         j=friends.length;
     for(i =0; i <friendRequests.length; i++)
         {ar[j]=friendRequests[i].id
        j++;}

     const users = await User.find({ _id: { $nin: ar} })
     res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Servor Error");
    }
});


 
module.exports = router;

