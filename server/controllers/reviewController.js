const mongoose = require('mongoose');
const Restaurant = require('../models/Restaurant');
const Review = require('../models/Review');

exports.addReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    const restaurant = await Restaurant.findById(req.params.id);
    restaurant.reviews.push(review.id);
    await restaurant.save();
    return res.status(201).json({
      success: true,
      data: review
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

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json({
      success: true,
      data: reviews
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.reviewId);
    const restaurant = await Restaurant.findById(req.params.id);
    restaurant.reviews.pull(req.params.reviewId);
    await restaurant.save();
    res.status(200).json({
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