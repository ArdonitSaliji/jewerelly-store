const express = require('express');
const router = express.Router();
const signUpSchema = require('./signUpSchema');
router.use('/basket', (req, res) => {
  res.send('hi');
});
router.post('/api/login', async (req, res) => {
  const email = await signUpSchema.find({
    emailOrPhone: req.body.emailOrPhone,
  });
  const password = await signUpSchema.find({ password: req.body.password });
  if (email && email.length > 0 && password && password.length > 0) {
    return res.status(200).send({ login: 'successful' });
  }
  if (email.length < 1) {
    return res.status(404).send({ login: 'Account does not exist' });
  }
  if (email && email.length > 0 && password.length < 1) {
    return res.status(401).send({ login: 'wrong password' });
  }
});

router.post('/api/signup', async (req, res) => {
  const userExists = await signUpSchema.findOne({
    emailOrPhone: req.body.emailOrPhone,
  });
  if (userExists && userExists !== []) {
    return res.status(409).json({ error: 'User already exists' });
  }
  const user = new signUpSchema({
    emailOrPhone: req.body.emailOrPhone,
    password: req.body.password,
  });
  const userCreated = await user.save();
  return res.status(201).json({ data: { id: userCreated.id } });
});

module.exports = router;
