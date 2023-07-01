const express = require("express");
const chats = require("./data/data");
const dotenv = require("dotenv");
const uroutes = require("./routes/uroutes");
const croutes = require("./routes/croutes");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./errorHandle");
const app = express();

app.use(express.json());
dotenv.config();
connectDB();
app.get("/", (req, res) => {
  res.send("API is running");
});
app.use("/api/user", uroutes);
app.use("/api/chat", croutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`The server is running on port ${PORT}`));
