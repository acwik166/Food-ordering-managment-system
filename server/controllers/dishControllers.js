const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

exports.getDishes = async (req, res) => {
  try {
    const dishes = await prisma.dish.findMany({
      where: {
        restaurant_id: parseInt(req.params.id)
      }
    });
    return res.status(200).json({
      success: true,
      length: dishes.length,
      data: dishes
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
    const dish = await prisma.dish.findOne({
      where: {
        id: parseInt(req.params.dishId)
      }
    });
    return res.status(200).json({
      success: true,
      data: dish
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
    const dish = await prisma.dish.findOne.create({
      data: {
        name: req.body.name,
        sizes: req.body.sizes,
        ingredients: req.body.ingredients,
        price: req.body.price,
        restaurant: {
          connect: { id: req.restaurant.id }
        }
      }
    });
    return res.status(201).json({
      success: true,
      data: `Dish ${dish.name} added`
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
    const dish = await prisma.dish.delete({
      where: {
        id: parseInt(req.params.dishId)
      }
    })
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