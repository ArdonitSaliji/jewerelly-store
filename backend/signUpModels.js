const mongoose = require('mongoose')
const Schema = mongoose.Schema
const signUpModel = new Schema({
  emailOrPhone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})
module.exports = mongoose.model('mytables', signUpModel)
