const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

exports.getRestaurants = async (req, res) => {
  try {
    const city = req.query.city;
    const restaurants = await prisma.restaurant.findMany({
      where: {
        restaurantaddress: {
          city: {
            contains: city
          }
        }
      }
    });
    return res.status(200).json({
      success: true,
      length: restaurants.length,
      data: restaurants
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}

exports.getRestaurant = async (req, res) => {
  try {
    const restaurant = await prisma.restaurant.findOne({
      where: {
        id: parseInt(req.params.id)
      }
    });
    return res.status(200).json({
      success: true,
      data: restaurant
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}

exports.addRestaurant = async (req, res) => {
  try {
    const restaurant = await prisma.restaurant.create({
      data: {
        name: req.body.name,
        type: req.body.type,
        phone: req.body.phone,
        delivery: req.body.delivery,
        deliveryfee: req.body.deliveryFee,
        client: {
          connect: { id: req.user.id }
        },
        restaurantaddress: {
          create: { city: req.body.city, street: req.body.street, zip: req.body.zip }
        }
      }
    });
    return res.status(201).json({
      success: true,
      data: restaurant
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}

exports.deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await prisma.restaurant.delete({
      where: {
        id: parseInt(req.params.id)
      }
    });
    return res.status(200).json({
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