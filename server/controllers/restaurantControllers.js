const db = require('../db/index');

exports.getRestaurants = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM restaurant');
    console.log(req.user);
    return res.status(200).json({
      success: true,
      length: result.rows.length,
      data: result.rows
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
    const result = await db.query('SELECT * FROM restaurant WHERE id = $1', [req.params.id]);
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

exports.addRestaurant = async (req, res) => {
  try {
    const address = await db.query('INSERT INTO restaurantaddress (city, street, zip) VALUES($1, $2, $3) RETURNING id', [req.body.city, req.body.street, req.body.zip]);
    const restaurantAddressId = address.rows[0].id;
    const result = await db.query('INSERT INTO restaurant (name, type, phone, delivery, deliveryFee, owner_id, address_id) VALUES($1, $2, $3, $4, $5, $6, $7)', [req.body.name, req.body.type, req.body.phone, req.body.delivery, req.body.deliveryFee, req.user.id, restaurantAddressId]);
    return res.status(201).json({
      success: true,
      data: `Restaurant ${req.body.name} created`
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
    const result = await db.query('DELETE FROM restaurant WHERE id = $1', [req.params.id]);
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