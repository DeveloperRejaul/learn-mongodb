const express = require("express");
const fileUpload = require("express-fileupload");
const config = require("../../config.js");
const { User } = require("./userModel.js");
const app = express();
const cloudinary = require("cloudinary").v2;
app.use(express.json());
config.connectDB();
app.use(
  fileUpload({
    useTempFiles: true,
    limits: { fileSize: 50 * 2024 * 1024 },
    // tempFileDir: "/15.cloudinary-image-upload/temp",
  })
);

// Configuration
cloudinary.config({
  cloud_name: "dwvtgpici",
  api_key: "285945558357813",
  api_secret: "khuPFA09D_QqaPCycinRmwWgb-Y",
});

app.post("/upload", async (req, res) => {
  const file = req.files.image;
  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    public_id: Date.now(),
    resource_type: "auto",
    folder: "images",
  });

  const newUser = User({
    profilePic: result.url,
  });
  await newUser.save();

  res.status(200).send(result);
});

module.exports = app;
