const express = require("express");
const mongoose = require("mongoose");
const config = require("../../config.js");
require("dotenv").config();

// Stape:01
const encrypt = require("mongoose-encryption");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
config.connectDB();

//stape:02 -> create Schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  password: String,
});

// Stape 03 : create secret key
const encKey = process.env.S_KEY;
userSchema.plugin(encrypt, {
  secret: encKey,
  encryptedFields: ["password"],
});
const User = mongoose.model("User", userSchema);

//Stape 04 : cterate post route
app.post("/", async (req, res) => {
  const { name, age, password } = req.body;

  const newUser = await User.create({
    name,
    age,
    password,
  });

  res.status(200).send({ user: newUser });
});

app.get("/", async (req, res) => {
  const user = await User.find();
  res.status(200).send({ user: user });
});

module.exports = app;
