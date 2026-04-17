const express = require("express");
const router = express.Router();

const {
  createMeeting,
  joinMeeting,
  getZegoToken
} = require("../controllers/meetingController");

router.post("/create", createMeeting);
router.post("/join/:meetingId", joinMeeting);
router.post("/zego-token", getZegoToken);

module.exports = router;