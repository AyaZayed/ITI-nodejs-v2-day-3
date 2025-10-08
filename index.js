const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const usersRouter = require("./routers/usersRouter");
const app = express();
const postsRouter = require("./routers/postsRouter");

require("dotenv").config();

// middleware to parse json body
app.use(express.json());
app.use(cors());

// routes
app.use("/users", usersRouter);
app.use("/posts", postsRouter);

// not found routes
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
});

const PORT = 6000;
const MONGODB_URI = process.env.MONGODB_URI

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("✅✅ Connected to MongoDB"))
    .catch((err) => console.error("❌❌ Error connecting to MongoDB", err));
});
