const mongoose = require('mongoose');
const addressSchema = require('./Address');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    maxlength: 9,
    required: true
  },
  addresses: [addressSchema]
})

const User = mongoose.model('User', userSchema);

module.exports = User;