const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const { join } = require("path");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  express.static(join(process.cwd(), "src/10._file_upload_to_databass/uploads"))
);

// Connect db
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/fileTest");
    console.log("db is connected");
  } catch (error) {
    console.log("db is not connected");
    console.log(error);
    process.exit();
  }
};
connectDB();

// Creating Schema and model
const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is requiresd"],
  },
  image: {
    type: String,
    required: [true, "image is requiresd"],
  },
});
const Users = mongoose.model("FileUploadTest", usersSchema);

// upload file to server===========================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/10._file_upload_to_databass/uploads/");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});
const upload = multer({ storage: storage });

app.post("/profile", upload.single("avatar"), async function (req, res, next) {
  // get full url
  // var fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  const imageURL =
    req.protocol + "://" + req.get("host") + "/" + req.file.filename;

  try {
    const newUsers = new Users({
      name: req.body.name,
      image: imageURL,
    });
    await newUsers.save();
    res.status(200).send("file is uploaded to databass" + newUsers);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
// upload file to server==============================

app.get("/profile", function (req, res) {
  res.sendFile(__dirname + "/app.html");
});
app.get("/", function (req, res) {
  res.send("Hello world");
});

module.exports = app;
