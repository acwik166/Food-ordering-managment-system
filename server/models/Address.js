const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    maxlength: 6,
    required: true
  }
})

module.exports = addressSchema;