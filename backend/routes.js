const express = require('express');
const router = express.Router();
const Users = require('./Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

  if (!email && !userExists) {
    return res.status(404).send({ login: 'Account does not exist' });
  }
  if (req.session.user) {
    res.send(req.session.user);
  } else {
    req.session.user = {
      emailOrUsername,
    };
  }
  if (foundUser) {
    let authPassword = await bcrypt.compare(userLoggingIn.password, foundUser.password);
    if (authPassword)
      return res.status(200).send({ user: req.session.user, msg: 'login successful' });
  }
  return res.status(401).send({ msg: 'Incorrect Username/Email or Password' });
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
