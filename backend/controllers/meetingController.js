const generateMeetingId = require("../utils/meetingIdGenerator");
const { generateZegoToken } = require("../utils/zegoTokenGenerator");
const zegoConfig = require("../config/zegoConfig");

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

exports.getZegoToken = (req, res) => {
  try {
    const { userId, roomId } = req.body;
    
    if (!userId || !roomId) {
      return res.status(400).json({ success: false, message: "userId and roomId are required" });
    }
    
    const token = generateZegoToken(userId, roomId);
    
    res.json({
      success: true,
      token,
      appID: zegoConfig.appID
    });
  } catch (error) {
    console.error("Error generating ZEGOCLOUD token:", error);
    res.status(500).json({ success: false, message: "Failed to generate token" });
  }
};