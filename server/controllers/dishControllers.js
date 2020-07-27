const mongoose = require('mongoose');
const Dish = require('../models/Dish');
const Restaurant = require('../models/Restaurant');

exports.getDishes = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    const dishes = await Dish.find({ _id: { $in: restaurant.dishes } });
    return res.status(200).json({
      success: true,
      data: dishes
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}

exports.addDish = async (req, res) => {
  try {
    const dish = await Dish.create(req.body);
    const restaurant = await Restaurant.findById(req.params.id)
    restaurant.dishes.push(dish.id);
    await restaurant.save();
    return res.status(201).json({
      success: true,
      data: dish
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((msg) => msg.message);
      return res.status(500).json({
        success: false,
        error: messages
      })
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server error'
      })
    }
  }
}

exports.deleteDish = async (req, res) => {
  try {
    const dish = await Dish.findByIdAndDelete(req.params.dishId);
    const restaurant = await Restaurant.findById(req.params.id);
    restaurant.dishes.pull(req.params.dishId);
    await restaurant.save()
    return res.status(201).json({
      success: true,
      message: 'Successfully deleted'
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}