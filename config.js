const express = require("express");
const mongoose = require("mongoose");

const config = {
  startServer: () => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  },
  app: express(),

  connectDB: async () => {
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/learnMongoose");
      console.log("db is connected");
    } catch (error) {
      console.log("db is not connected");
      console.log(error);
      process.exit();
    }
  },
  mongoose: mongoose,
};

module.exports = config;
