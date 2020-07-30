exports.authUser = (req, res, next) => {
  if (req.user == null) {
    return res.status(403).send('User not authenticated. Please sign in')
  }
  next();
}

exports.authRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role || req.user.role !== 'admin') {
      res.status(401).send('Not allowed');
    }
    next();
  }
}

