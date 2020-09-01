const { PrismaClient } = require("@prisma/client");
const { connect } = require("../routes/orderRoutes");

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
    // const address = await prisma.address.findOne({
    //   where: {
    //     user_id: req.user.id
    //     // id: 26
    //   }
    // });
    // const address_id = address.id;
    const order = await prisma.order.create({
      data: {
        quantity: req.body.quantity,
        phone: req.body.phone,
        amount: req.body.amount,
        user: {
          connect: { id: req.user.id }
        },
        address: {
          // CONNECT TO ACTUAL ADDRESS OBJECT
          connect: { id: 1 }
        }
      }
    });
    return res.status(201).json({
      success: true,
      data: order
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}

