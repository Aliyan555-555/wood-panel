const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const connectDB = require("./db");
const CoreRouter = require("./routers/core.route");
const VeneerRouter = require("./routers/veneer.route");

// Load environment variables
dotenv.config();

const app = express();

// Cores configuration
app.use(cors({
  origin: "*",
  credentials: true,
}));

app.use(express.json());

// Ensure upload folder exists
const uploadFolder = path.join(__dirname, "upload");
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
  console.log("Upload folder created.");
}

// Static file serving
app.use("/uploads", express.static(uploadFolder));

// API routes
app.use("/api/v1/core", CoreRouter);
app.use("/api/v1/veneer", VeneerRouter);

// Connect to the database
connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
