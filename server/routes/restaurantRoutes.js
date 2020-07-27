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

const router = express.Router();

router
  .route('/')
  .get(getRestaurants)
  .post(addRestaurant);

router
  .route('/:id')
  .get(getRestaurant)
  .delete(deleteRestaurant);

router
  .route('/:id/dishes/:dishId')
  .delete(deleteDish);

router
  .route('/:id/dishes')
  .get(getDishes)
  .post(addDish);

module.exports = router;