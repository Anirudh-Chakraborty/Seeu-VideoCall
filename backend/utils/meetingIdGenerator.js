const crypto = require ('crypto');
function generateMeetingId() {
  const id = "seeu-" + crypto.randomUUID();
  return id;}
module.exports = generateMeetingId;