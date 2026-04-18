const { generateToken04 } = require("./zegoServerAssistant");
require("dotenv").config();

/**
 * Generate ZEGOCLOUD Token
 * @param {string} userId - Unique user ID
 * @param {string} roomId - Room or Meeting ID
 * @returns {string} - Generated ZEGOCLOUD Auth Token
 */
const generateZegoToken = (userId, roomId) => {
  const appIDString = process.env.ZEGO_APP_ID;
  const secret = process.env.ZEGO_SERVER_SECRET;

  if (!appIDString || appIDString === "YOUR_ZEGO_APP_ID" || !secret || secret === "YOUR_ZEGO_SERVER_SECRET") {
    throw new Error("Cannot generate token: Please replace 'YOUR_ZEGO_APP_ID' and 'YOUR_ZEGO_SERVER_SECRET' with your actual keys in backend/.env");
  }

  const appID = parseInt(appIDString, 10);

  // Token valid time (in seconds) - e.g., 2 hours
  const effectiveTimeInSeconds = 7200;
  
  const payload = ""; // Optional extra payload

  // Build token
  // Use appID, userId, secret, effectiveTimeInSeconds, payload
  const token = generateToken04(
    appID,
    userId,
    secret,
    effectiveTimeInSeconds,
    payload
  );

  return token;
};

module.exports = { generateZegoToken };
