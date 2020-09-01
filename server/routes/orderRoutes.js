const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

const {
  getOrders,
  addOrder
} = require('../controllers/orderControllers');

router.use('/', verifyToken);

router
  .route('/')
  .get(getOrders)
  .post(addOrder);

module.exports = router;

