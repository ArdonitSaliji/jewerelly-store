const express = require('express');
const router = express.Router();
const Users = require('./Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  console.log(token);

  if (!token) {
    res.status(401).send({ msg: 'No token provided!' });
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: 'Authentication failed' });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};
router.get('/api/auth', authenticateToken, async (req, res) => {
  res.send({ message: 'Authenticated Succesfully' });
});

router.post('/api/login', async (req, res) => {
  const userLoggingIn = req.body;
  const { emailOrUsername } = req.body;

  const email = await Users.findOne({
    email: emailOrUsername,
  });
  const userExists = await Users.findOne({
    username: emailOrUsername,
  });
  let foundUser;
  if (email) foundUser = email;
  else foundUser = userExists;

  if (!foundUser) {
    return res.status(404).send({ login: 'Account does not exist' });
  }
  if (foundUser) {
    bcrypt.compare(userLoggingIn.password, foundUser.password, (err, user) => {
      if (user) {
        const signUser = { username: emailOrUsername };
        const accessToken = jwt.sign(signUser, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '10m',
        });
        const refreshToken = jwt.sign(signUser, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '1d',
        });
        req.session.user = user;
        res.status(200).json({
          auth: true,
          accessToken: accessToken,
          refreshToken: refreshToken,
          user: req.session.user,
          username: emailOrUsername,
          msg: 'login successful',
        });
      } else {
        res.status(401).send({ msg: 'Incorrect Username/Email or Password' });
      }
    });
  }
});

router.post('/api/signup', async (req, res) => {
  const user = req.body;
  const takenEmail = await Users.findOne({
    email: req.body.email,
  });
  const takenUsername = await Users.findOne({
    username: user.username,
  });
  if (takenEmail || takenUsername) {
    return res.status(409).json({ error: 'Account already exists' });
  } else {
    user.password = await bcrypt.hash(req.body.password, 10);
    const dbUser = new Users({
      username: user.username,
      email: user.email,
      password: user.password,
    });
    const userCreated = await dbUser.save();
    return res.status(201).json({ data: { id: userCreated.id } });
  }
});

router.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('connect.sid'); // clean up!
  return res.json({ msg: 'logging you out' });
});
module.exports = router;
