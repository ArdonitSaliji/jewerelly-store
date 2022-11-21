const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const SignUpSchema = new Schema({
  emailOrPhone: {
    type: String,
    required: true,
    unique: false,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    data: Buffer,
    contentType: String,
  },
  selectedDefaultImage: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

// Todo:
// Encrypt Passwords

module.exports = mongoose.model('mytables', SignUpSchema)
