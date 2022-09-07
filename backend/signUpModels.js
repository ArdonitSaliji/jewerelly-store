const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const signUpModel = new Schema({
  emailOrPhone: {
    type: String,
    required: true,
    unique: false,
  },
  password: {
    type: String,
    required: true,
  },
  loginState: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("mytables", signUpModel);
