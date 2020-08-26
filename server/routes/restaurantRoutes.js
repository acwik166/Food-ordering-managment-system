const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { 
  setRestaurant, 
  authIsRestaurantOwner, 
  authAddRestaurant, 
  authIsReviewAuthor
 } = require('../middleware/restaurantPermissions');
const { 
  getRestaurants, 
  getRestaurant, 
  addRestaurant, 
  deleteRestaurant 
} = require('../controllers/restaurantControllers');
const { 
  getDishes, 
  addDish,  
  getDish,
  deleteDish
} = require('../controllers/dishControllers');
const { 
  getReviews, 
  getReview, 
  addReview, 
  deleteReview 
} = require('../controllers/reviewController');

router.use('/:id', setRestaurant)

// Restaurant 
router
  .route('/')
  .get(getRestaurants)
  .post(verifyToken, authAddRestaurant, addRestaurant);

router
  .route('/:id')
  .get(getRestaurant)
  .delete(verifyToken, authIsRestaurantOwner, deleteRestaurant);

// Dishes
// router
//   .route('/:id/dishes')
//   .get(getDishes)
//   .post(verifyToken, authIsRestaurantOwner, addDish);
  
// router
//   .route('/:id/dishes/:dishId')
//   .get(getDish)
//   .delete(verifyToken, authIsRestaurantOwner, deleteDish);

// // Reviews
// router
//   .route('/:id/reviews')
//   .get(getReviews)
//   .post(verifyToken, addReview);

// router
//   .route('/:id/reviews/:reviewId')
//   .get(getReview)
//   .delete(verifyToken, authIsReviewAuthor, deleteReview);

module.exports = router;