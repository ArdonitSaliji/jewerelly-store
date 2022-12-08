const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
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
  date: {
    type: Date,
    default: Date.now,
  },
});

// Todo:
// Encrypt Passwords

module.exports = mongoose.model('User', SignUpSchema);
