const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');
const { getUsers, addUser, addOwner, addAdmin, loginUser, logoutUser, getCurrentUser } = require('../controllers/userControllers');

router.use('/me', verifyToken);
router.use('/logout', verifyToken);

router
  .route('/')
  .get(getUsers);

router
  .route('/me')
  .get(getCurrentUser);

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

router
  .route('/logout')
  .get(logoutUser);

module.exports = router;