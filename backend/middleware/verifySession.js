function checkSessionUser(req, res, next) {
  if (req.session.user === req.params.user) {
    next();
  } else {
    res.status(403).send('You do not have permission to access this route');
  }
}

module.exports = checkSessionUser;
