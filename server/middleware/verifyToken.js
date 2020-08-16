const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const cookie = req.cookies.access_token;

  if (cookie == null) {
    return res.sendStatus(401);
  }

  jwt.verify(cookie.token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.sendStatus(403);
    }
    req.user = user;
    next();
  })
}

module.exports = verifyToken;

