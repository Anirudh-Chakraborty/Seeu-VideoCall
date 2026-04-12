const express = require("express");
const cors = require("cors");

const meetingRoutes = require("./routes/meetingRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/meeting", meetingRoutes);

const PORT = process.env.PORT || 5001;
app.get("/", (req, res) => {
  res.send("Server working");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});