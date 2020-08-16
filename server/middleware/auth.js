// exports.authRole = (role) => {
//   return (req, res, next) => {
//     if (req.user.role !== role || req.user.role !== 'admin') {
//       res.status(401).send('Not allowed');
//     }
//     next();
//   }
// }

exports.authUser = () => {
  return (req, res, next) => {
    if (req.user == null) {
      res.status(401).send('User is not logged in');
    }
    next();
  }
}



