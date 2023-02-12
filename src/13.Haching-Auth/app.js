const express = require("express");
const mongoose = require("mongoose");
const config = require("../../config.js");

// Stape:01
var md5 = require("md5");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
config.connectDB();

//stape:02 -> create Schema
const userSchema = mongoose.Schema({
  name: String,
  age: Number,
  password: String,
});
const User = mongoose.model("User", userSchema);

app.post("/", async (req, res) => {
  const { name, age, password } = req.body;

  const newUser = await User.create({
    name,
    age,
    //Stape 03 : cterate post route
    password: md5(password),
  });

  res.status(200).send({ user: newUser });
});

app.post("/login", async (req, res) => {
  const { name, password } = req.body;

  const user = await User.findOne({ name: name });

  if (user.password == md5(password)) {
    res.status(200).send({ user: "Login Done" });
  }
});

module.exports = app;
