const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

const {
  getOrders
} = require('../controllers/orderControllers');

router
  .route('/')
  .get(getOrders)

module.exports = router;

