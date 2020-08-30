const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

exports.getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany();
    return res.status(200).json({
      success: true,
      length: orders.length,
      data: orders
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}

exports.getOrder = async (req, res) => {
  try {
    const order = await prisma.order.findOne({
      where: {
        id: req.params.id
      }
    });
    return res.status(200).json({
      success: true,
      data: order
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}

exports.addOrder = async (req, res) => {
  try {
    const order = await prisma.order.create({
      data: {
        
      }
    });
    return res.status(201).json({
      success: true,
      data: order
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}

