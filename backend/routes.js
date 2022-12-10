const express = require('express');
const router = express.Router();
const signUpSchema = require('./signUpSchema');

router.post('/api/login', async (req, res) => {
  const email = await signUpSchema.find({
    email: req.body.emailOrUsername,
  });
  const username = await signUpSchema.find({
    username: req.body.emailOrUsername,
  });
  const password = await signUpSchema.find({ password: req.body.password });
  if (email.length < 1 && username.length < 1) {
    return res.status(404).send({ login: 'Account does not exist' });
  }

  if (
    ((email && email.length > 0) || (username && username.length > 0)) &&
    password &&
    password.length > 0
  ) {
    return res.status(200).send({ firstLetter: username[0].username[0] });
  }

  if (email && email.length > 0 && password.length < 1) {
    return res.status(401).send({ login: 'wrong password' });
  }
});

router.post('/api/signup', async (req, res) => {
  const userExists = await signUpSchema.findOne({
    email: req.body.email,
  });
  if (userExists && userExists !== []) {
    return res.status(409).json({ error: 'Account already exists' });
  }
  const user = new signUpSchema({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  const userCreated = await user.save();
  return res.status(201).json({ data: { id: userCreated.id } });
});

module.exports = router;
