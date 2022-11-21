const express = require('express')
const signUpModel = require('./signUpModels')
const uuid = require('uuid').v4
const router = express.Router()
const fs = require('fs')

router.post('/api/login', async (req, res) => {
  const email = await signUpModel.find({ emailOrPhone: req.body.emailOrPhone })
  const account = await signUpModel.findOne({
    emailOrPhone: req.body.emailOrPhone,
    password: req.body.password,
  })
  if (account) {
    return res.status(200).send({ login: 'successful' })
  }
  if (email.length < 1 && !account) {
    return res.status(404).send({ login: 'Account does not exist' })
  }
  if (email && !account) {
    return res.status(401).send({ login: 'wrong password' })
  }
})

router.post('/api/signup', async (req, res) => {
  const userExists = await signUpModel.findOne({
    emailOrPhone: req.body.emailOrPhone,
  })
  if (userExists) {
    return res.status(409).json({ error: 'User already exists' })
  }
  if (!userExists) {
    const user = new signUpModel({
      emailOrPhone: req.body.emailOrPhone,
      password: req.body.password,
    })
    const userCreated = await user.save()
    return res.status(201).json({ data: { id: userCreated.id } })
  }
})

module.exports = router
