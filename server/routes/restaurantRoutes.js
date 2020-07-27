const express = require('express');
const { 
  getRestaurants, 
  getRestaurant, 
  addRestaurant, 
  deleteRestaurant 
} = require('../controllers/restaurantControllers');
const { 
  getDishes, 
  addDish,  
  deleteDish
} = require('../controllers/dishControllers');
const { getReviews, addReview, deleteReview } = require('../controllers/reviewController');

const router = express.Router();

// Restaurant
router
  .route('/')
  .get(getRestaurants)
  .post(addRestaurant);

router
  .route('/:id')
  .get(getRestaurant)
  .delete(deleteRestaurant);

// Dishes
router
  .route('/:id/dishes')
  .get(getDishes)
  .post(addDish);
  
router
  .route('/:id/dishes/:dishId')
  .delete(deleteDish);

// Reviews
router
  .route('/:id/reviews')
  .get(getReviews)
  .post(addReview);

router
  .route('/:id/reviews/:reviewId')
  .delete(deleteReview);

module.exports = router;