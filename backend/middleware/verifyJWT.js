const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
  const token = req.cookies['access_token'];

  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(401).redirect('http://localhost:3000/');
      }
      req.user = decoded;
      next();
    });
  } else {
    res.status(401).redirect('http://localhost:3000/');
  }
}

module.exports = verifyJWT;
