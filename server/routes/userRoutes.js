const express = require('express');
const router = express.Router();

const { getUsers, addUser, addOwner, addAdmin, loginUser } = require('../controllers/userControllers');

router
  .route('/')
  .get(getUsers)

router
  .route('/signup')
  .post(addUser);

router
  .route('/signup-owner')
  .post(addOwner);

router
  .route('/signup-admin')
  .post(addAdmin);

router
  .route('/login')
  .post(loginUser);

module.exports = router;