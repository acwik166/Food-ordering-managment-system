const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  ingredients: [{
    type: String
  }],
  size: [{
    type: Number
  }],
  category: [{
    type: String
  }]
})

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;