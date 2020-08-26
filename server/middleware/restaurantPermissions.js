const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

// Check if user is owner of restaurant
exports.authIsRestaurantOwner = (req, res, next) => {
  if (!(req.user.id == req.restaurant.owner_id || req.user.role === 'admin')) {
    return res.status(403).send('Not allowed');
  }
  next();
}

// Restaurant permissions
exports.setRestaurant = async (req, res, next) => {
  const restaurant = await prisma.restaurant.findOne({
    where: {
      id: req.params.id
    }
  });
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
  const review = await prisma.review.findOne({
    where: {
      id: req.params.reviewId
    }
  });
  if(!(req.user.id == review.client_id)) {
    return res.status(403).send('Not allowed');
  }
  next();
}