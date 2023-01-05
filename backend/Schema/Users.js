const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Users = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: { type: String },
  cart: [],
  verified: { type: Boolean, default: false },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", Users);
