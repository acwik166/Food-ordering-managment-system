const mongoose = require('mongoose');
const Restaurant = require('../models/Restaurant');

exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    return res.status(200).json({
      success: true,
      length: restaurants.length,
      data: restaurants
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}

exports.getRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    return res.status(200).json({
      success: true,
      data: restaurant
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}

exports.addRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.create(req.body);
    return res.status(201).json({
      success: true,
      data: restaurant
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}

exports.deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    return res.status(200).json({
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