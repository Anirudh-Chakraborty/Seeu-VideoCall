require("dotenv").config();

module.exports = {
  appID: parseInt(process.env.ZEGO_APP_ID, 10),
  serverSecret: process.env.ZEGO_SERVER_SECRET
};
