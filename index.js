const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");
const CoreRouter = require("./routers/core.route");
const VeneerRouter = require("./routers/veneer.route");
const fs = require("fs");

dotenv.config();

const app = express();
app.use(cors({}));
app.use(express.json());

// Ensure the upload folder exists
const uploadFolder = path.join(__dirname, "upload");
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
  console.log("Upload folder created.");
}

// Make the upload folder publicly accessible
app.use("/uploads", express.static(uploadFolder));

app.use("/api/v1/core", CoreRouter);
app.use("/api/v1/veneer", VeneerRouter);
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
