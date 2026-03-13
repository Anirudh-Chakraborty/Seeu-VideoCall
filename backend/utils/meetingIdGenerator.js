function generateMeetingId() {
  const chars = "abcdefghijklmnopqrstuvwxyz";

  const generatePart = () =>
    Array.from({ length: 3 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");

  return `${generatePart()}-${generatePart()}-${generatePart()}`;
}

module.exports = generateMeetingId;