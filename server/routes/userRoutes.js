const express = require('express');
const router = express.Router();

const { getUsers, addUser, loginUser } = require('../controllers/userControllers');

router
  .route('/')
  .get(getUsers)
  .post(addUser);

router
  .route('/login')
  .post(loginUser)

module.exports = router;