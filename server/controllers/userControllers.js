const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await prisma.client.findOne({
      where: {
        id: req.user.id
      }
    });
    const { firstname, lastname, email, role } = user;
    return res.status(200).json({
      success: true,
      data: {
        firstname,
        lastname,
        email,
        role
      }
    })
  } catch (error) {
    res.status(500).json({
      success: true,
      error: 'Server error'
    })
  }
}

exports.getUsers = async (req, res) => {
  try {
    const result = await prisma.client.findMany();
    return res.status(200).json({
      success: true,
      data: result
    })
  } catch (error) {
    res.status(500).json({
      success: true,
      error: 'Server error'
    })
  }
}

exports.addUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await prisma.client.create({
      data: {
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        password: hashedPassword,
        email: req.body.email,
        role: 'user'
      }
    });
    return res.status(201).json({
      success: true,
      data: `User ${user.firstname} ${user.lastname} added`
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.detail
    })
  }
}

exports.addAdmin = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await prisma.client.create({
      data: {
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        password: hashedPassword,
        email: req.body.email,
        role: 'admin'
      }
    });
    return res.status(201).json({
      success: true,
      data: `Admin ${user.firstname} ${user.lastname} added`
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.detail
    })
  }
}

exports.addOwner = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await prisma.client.create({
      data: {
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        password: hashedPassword,
        email: req.body.email,
        role: 'owner'
      }
    });
    return res.status(201).json({
      success: true,
      data: `Owner ${user.firstname} ${user.lastname} added`
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.detail
    })
  }
}

exports.loginUser = async (req, res) => {
  try {
    const user = await prisma.client.findOne({
      where: {
        email: req.body.email
      }
    });
    if (user == null) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email'
      })
    }
    await bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (result) {
        const accessToken = jwt.sign({ id: user.id, role: user.role }, process.env.ACCESS_TOKEN_SECRET)
        // Cookie { secure: true } in production
        res.cookie('access_token', { token: accessToken }, { maxAge: 900000, httpOnly: true, sameSite: true });
        return res.status(200).json({
          success: true,
          message: 'Logged in'
        })
      } else {
        return res.status(401).json({
          success: false,
          message: 'Invalid password'
        })
      }
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}

exports.logoutUser = (req, res) => {
  try {
    res.clearCookie('access_token');
    return res.status(200).json({
      success: true,
      message: 'Logged out'
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}