const express = require("express");
const router = express.Router();
const { 
    sendFriendRequestValidation,
    CRFriendRequestValidation,
    deleteFriendValidation,
    acceptFriendRequestValidation
 }=require("../middleware/validateFriend")
const { 
    sendFriendRequestController,
    cancelFriendRequestController,
    acceptFriendRequestController,
    rejectFriendRequestController,
    deleteFriendController,
    getFriendRequestsController,
    getSentFriendRequestsController
 } = require("../controller/authFriend");

router.post("/send-friend-request", sendFriendRequestValidation, sendFriendRequestController);
router.post("/cancel-friend-request",CRFriendRequestValidation,cancelFriendRequestController);
router.post("/accept-friend-request",acceptFriendRequestValidation, acceptFriendRequestController);
router.post("/reject-friend-request",CRFriendRequestValidation,rejectFriendRequestController);
router.post("/delete-friend",deleteFriendValidation, deleteFriendController );
router.get("/my-friend-requests/:id",getFriendRequestsController)
router.get("/sent-friend-requests/:id",getSentFriendRequestsController)
module.exports = router;