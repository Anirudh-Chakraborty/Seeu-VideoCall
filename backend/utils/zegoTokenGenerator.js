const { generateToken04 } = require("zego-server-assistant");
require("dotenv").config();

const appID = parseInt(process.env.ZEGO_APP_ID, 10);
const secret = process.env.ZEGO_SERVER_SECRET;

/**
 * Generate ZEGOCLOUD Token
 * @param {string} userId - Unique user ID
 * @param {string} roomId - Room or Meeting ID
 * @returns {string} - Generated ZEGOCLOUD Auth Token
 */
const generateZegoToken = (userId, roomId) => {
  if (!appID || !secret) {
    throw new Error("ZEGOCLOUD App ID or Server Secret is missing");
  }

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
