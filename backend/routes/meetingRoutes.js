const express = require("express");
const router = express.Router();

const {
  createMeeting,
  joinMeeting
} = require("../controllers/meetingController");

router.post("/create", createMeeting);
router.post("/join/:meetingId", joinMeeting);

module.exports = router;