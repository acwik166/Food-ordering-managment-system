const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

exports.getDishes = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM dish');
    return res.status(200).json({
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

exports.getDish = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM dish WHERE id = $1', [req.params.dishId]);
    return res.status(200).json({
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

exports.addDish = async (req, res) => {
  try {
    const result = await db.query('INSERT INTO dish (name, sizes, ingredients, price, restaurant_id) VALUES($1, $2, $3, $4, $5)', [req.body.name, req.body.sizes, req.body.ingredients, req.body.price, req.restaurant.id]);
    return res.status(201).json({
      success: true,
      data: `Dish ${req.body.name} added`
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}

exports.deleteDish = async (req, res) => {
  try {
    const result = await db.query('DELETE FROM dish WHERE id = $1', [req.params.dishId]);
    return res.status(201).json({
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