const db = require('../db/index');

// Check if user is owner of restaurant
exports.authIsRestaurantOwner = (req, res, next) => {
  if (!(req.user.id == req.restaurant.owner_id || req.user.role === 'admin')) {
    return res.status(403).send('Not allowed');
  }
  next();
}

// Restaurant permissions
exports.setRestaurant = async (req, res, next) => {
  const result = await db.query('SELECT * FROM restaurant WHERE id = $1', [req.params.id]);
  const restaurant = result.rows[0];
  if (restaurant == null) {
    return res.status(404).send('Restaurant not found');
  }
  req.restaurant = restaurant;
  next();
}

exports.authDeleteRestaurant = (req, res, next) => {
  if (!(req.user.id == req.restaurant.owner_id || req.user.role === 'admin')) {
    return res.status(403).send('Not allowed');
  }
  next();
}

exports.authAddRestaurant = (req, res, next) => {
  if (!(req.user.role == 'owner' || req.user.role === 'admin')) {
    return res.status(403).send('Not allowed');
  }
  next();
}

exports.authIsReviewAuthor = async (req, res, next) => {
  const result = await db.query('SELECT * FROM review WHERE id = $1', [req.params.reviewId]);
  const review = result.rows[0]
  if(!(req.user.id == review.client_id)) {
    return res.status(403).send('Not allowed');
  }
  next();
}