const express = require('express')
const mongoose = require('mongoose');
const multer  = require('multer')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))



// Connect db
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/fileTest')
    console.log("db is connected");
  } catch (error) {
     console.log("db is not connected");
    console.log(error);
    process.exit();
  }
}
connectDB()

// Creating Schema and model
const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is requiresd"]
  },
  image: {
    type: String,
    required: [true, "image is requiresd"]
  }
})
const Users= mongoose.model("FileUploadTest", usersSchema)


// upload file to server===========================
const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, 'src/10._file_upload_to_databass/uploads/')
  // },
  filename: function (req, file, cb) {
    const name = Date.now() + '-'+ file.originalname
    cb(null, name)
  }
})
const upload = multer({ storage: storage })

app.post('/profile', upload.single('avatar'), async function (req, res, next) {
  try {
    const newUsers = new Users({
      name: req.body.name,
      image: req.file.filename
    })
    await newUsers.save()
    console.log(req.file, req.body)
    res.status(200).send ("file is uploaded to databass"+newUsers)
  } catch (error) {
     res.status(500).send(error.message)
  }
})


// upload file to server==============================

app.get("/profile", function (req, res) {
  res.sendFile(__dirname + "/app.html");
});
app.get("/", function (req, res) {
  res.send("Hello world");
});

module.exports =app


