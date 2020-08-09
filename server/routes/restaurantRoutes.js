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

router.use('/', verifyToken);
router.use('/:id', setRestaurant)
router.use('/:id', authIsRestaurantOwner);

// Restaurant 
router
  .route('/')
  .get(getRestaurants)
  .post(authAddRestaurant, addRestaurant);

router
  .route('/:id')
  .get(getRestaurant)
  .delete(authIsRestaurantOwner, deleteRestaurant);

// Dishes
router
  .route('/:id/dishes')
  .get(getDishes)
  .post(authIsRestaurantOwner, addDish);
  
router
  .route('/:id/dishes/:dishId')
  .get(getDish)
  .delete(authIsRestaurantOwner, deleteDish);

// Reviews
router
  .route('/:id/reviews')
  .get(getReviews)
  .post(addReview);

router
  .route('/:id/reviews/:reviewId')
  .get(getReview)
  .delete(authIsReviewAuthor, deleteReview);

module.exports = router;