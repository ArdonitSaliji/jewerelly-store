const mongoose = require('mongoose')

const signUpModel = new mongoose.Schema({
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
