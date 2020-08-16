const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/index');

exports.getCurrentUser = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM client WHERE id = $1', [req.user.id]);
    const { firstname, lastname, email, role } = result.rows[0];
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
    const result = await db.query('SELECT * FROM client');
    return res.status(200).json({
      success: true,
      data: result.rows
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
    const result = await db.query('INSERT INTO client (firstName, lastName, password, email, role) VALUES($1, $2, $3, $4, $5)', [req.body.firstName, req.body.lastName, hashedPassword, req.body.email, 'user']);
    return res.status(201).json({
      success: true,
      data: `User ${req.body.firstName} ${req.body.lastName} added`
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
    const result = await db.query('INSERT INTO client (firstName, lastName, password, email, role) VALUES($1, $2, $3, $4, $5)', [req.body.firstName, req.body.lastName, hashedPassword, req.body.email, 'admin']);
    return res.status(201).json({
      success: true,
      data: `Admin ${req.body.firstName} ${req.body.lastName} added`
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
    const result = await db.query('INSERT INTO client (firstName, lastName, password, email, role) VALUES($1, $2, $3, $4, $5)', [req.body.firstName, req.body.lastName, hashedPassword, req.body.email, 'owner']);
    return res.status(201).json({
      success: true,
      data: `Owner ${req.body.firstName} ${req.body.lastName} added`
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
    const result = await db.query('SELECT * FROM client WHERE email = $1', [req.body.email]);
    const user = result.rows[0];
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