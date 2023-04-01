const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  profilePic: {
    type: String,
    default: "somting",
  },
});

exports.User = mongoose.model("user", userSchema);
