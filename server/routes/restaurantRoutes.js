const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { authUser, authRole } = require('../middleware/auth');

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

router.use('/', verifyToken);
router.use('/', authUser);

// Add middleware to verify company account *addRestaurant, deleteRestaurant, deleteDish*

router
  .route('/')
  .get(getRestaurants)
  .post(authRole('owner'), addRestaurant);

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