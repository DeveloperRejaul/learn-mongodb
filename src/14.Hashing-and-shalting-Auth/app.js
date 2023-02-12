const express = require("express");
const mongoose = require("mongoose");
const config = require("../../config.js");

// Stape:01
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
config.connectDB();

const userSchema = mongoose.Schema({
  name: String,
  age: Number,
  password: String,
});
const User = mongoose.model("User", userSchema);

app.post("/", async (req, res) => {
  const { name, age, password } = req.body;

  //stape:02 ->
  bcrypt.hash(password, saltRounds, async function (err, hash) {
    const newUser = await User.create({
      name,
      age,
      password: hash,
    });
    res.status(200).send({ user: newUser });
  });
});

app.post("/login", async (req, res) => {
  const { name, password } = req.body;

  const user = await User.findOne({ name: name });
  //stape:03 ->
  bcrypt.compare(password, user.password, function (err, result) {
    res.status(200).send({ user: "Login Done" });
  });
});

module.exports = app;
