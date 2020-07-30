const mongoose = require('mongoose');
const addressSchema = require('./Address');
const Restaurant = require('./Restaurant');

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
    enum: ['user', 'admin', 'owner'],
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
  userInfo: {
    addresses: [addressSchema]
  },
  ownerInfo: {
    restaurants: [{ 
      type: mongoose.Schema.Types.ObjectId, ref: Restaurant,
      verified: {
        type: Boolean,
        default: false
      }
    }],
    address: addressSchema
  },
  adminInfo: {

  },
})

const User = mongoose.model('User', userSchema);

module.exports = User;