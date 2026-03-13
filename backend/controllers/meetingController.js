const generateMeetingId = require("../utils/meetingIdGenerator");

exports.createMeeting = (req, res) => {
  const meetingId = generateMeetingId();

  res.json({
    success: true,
    meetingId,
    joinLink: `http://localhost:3000/room/${meetingId}`
  });
};

exports.joinMeeting = (req, res) => {
  const { meetingId } = req.params;

  if (!meetingId) {
    return res.status(400).json({
      success: false,
      message: "Meeting ID required"
    });
  }

  res.json({
    success: true,
    meetingId
  });
};