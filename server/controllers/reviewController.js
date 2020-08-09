const db = require('../db/index');

exports.addReview = async (req, res) => {
  try {
    const result = await db.query('INSERT INTO review (title, description, rating, client_id, restaurant_id) VALUES($1, $2, $3, $4, $5)', [req.body.title, req.body.description, req.body.rating, req.user.id, req.params.id]);
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

exports.getReviews = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM review');
    res.status(200).json({
      success: true,
      data: result.rows
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
    const result = await db.query('SELECT * FROM review WHERE id = $1', [req.params.reviewId]);
    res.status(200).json({
      success: true,
      data: result.rows[0]
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}

exports.deleteReview = async (req, res) => {
  try {
    const result = db.query('DELETE FROM review WHERE id = $1', [req.params.reviewId]);
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