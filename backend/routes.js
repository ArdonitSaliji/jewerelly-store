const express = require('express')
const router = express.Router()
const signUpTemplate = require('./signUpModels')
router.post('/api/signup', (req, res) => {
  console.log(req.body)
  const signedUser = new signUpTemplate({
    emailOrPhone: req.body.emailOrPhone,
    password: req.body.password,
  })
  signedUser
    .save()
    .then((data) => {
      res.json(data)
    })
    .catch((error) => {
      res.json(error)
    })
})

module.exports = router
