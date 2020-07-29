const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.getUsers = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: []
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
    const user = await User.create({
      'firstName': req.body.firstName,
      'lastName': req.body.lastName,
      'password': hashedPassword,
      'role': req.body.role,
      'email': req.body.email,
      'phone': req.body.phone,
      'addresses': [...req.body.addresses]
    });
    res.status(201).json({
      success: true,
      data: user
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

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user == null) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email'
      })
    }
    await bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (result) {
        res.status(200).json({
          success: true,
          message: 'Auth successful'
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