const express = require('express')
const router = express.Router()
const signUpModel = require('./signUpModels')

router.get('/api/users', (req, res) => {
  signUpModel.find({ emailOrPhone: req.query.email })
})

router.post('/api/signup', async (req, res) => {
  const userExists = await signUpModel.findOne({
    emailOrPhone: req.body.emailOrPhone,
  })
  if (userExists && userExists !== []) {
    return res.status(409).json({ error: 'User already exists' })
  }
  const user = new signUpModel({
    emailOrPhone: req.body.emailOrPhone,
    password: req.body.password,
  })
  const userCreated = await user.save()
  return res.status(201).json({ data: { id: userCreated.id } })
})

module.exports = router
