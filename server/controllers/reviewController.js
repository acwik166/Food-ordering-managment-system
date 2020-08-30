const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

exports.getReviews = async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        restaurant_id: parseInt(req.params.id)
      }
    });
    return res.status(500).json({
      success: true,
      length: reviews.length,
      data: reviews
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}

exports.getReview = async (req, res) => {
  try {
    const review = await prisma.review.findOne({
      where: {
        id: parseInt(req.params.reviewId)
      }
    });
    res.status(200).json({
      success: true,
      data: review
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}

exports.addReview = async (req, res) => {
  try {
    const review = await prisma.review.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        rating: req.body.rating,
        user: {
          connect: { id: req.user.id }
        },
        restaurant: {
          connect: { id: parseInt(req.params.id) }
        }
      }
    });
    return res.status(201).json({
      success: true,
      data: 'Added review'
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((msg) => msg.message);
      return res.status(500).json({
        success: false,
        error: messages
      })
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server error'
      })
    }
  }
}

exports.deleteReview = async (req, res) => {
  try {
    const review = await prisma.review.delete({
      where: {
        id: parseInt(req.params.reviewId)
      }
    });
    res.status(200).json({
      success: true,
      message: 'Successfully deleted'
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}