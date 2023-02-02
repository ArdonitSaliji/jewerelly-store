const stripe = require('stripe');
const express = require('express');
const session = require('express-session');
const router = express.Router();
const Users = require('../Schema/Users.js');
const Products = require('../Schema/Products.js');
const MongoDBStore = require('connect-mongodb-session')(session);
const sendEmail = require('../sendEmail');
const dotenv = require('dotenv');
const multer = require('multer');
const productRoutes = require('./products.js');
const fs = require('fs');
dotenv.config();

const store = new MongoDBStore({
  uri: process.env.DATABASE_ACCESS,
  collection: 'sessions',
});

let stripeGateway = stripe(
  'sk_test_51MCkXgDplZI5a2XjhslbZ4ge0UxGgEIAOvgGnpRRwta6scGnPvWFBlvaYhYqAXvnHK58tHwnUw133AZOpIma1H4q005lxIADbl'
);

let DOMAIN = 'http://localhost:3000/';

router.use(
  session({
    secret: 'secret',
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);

const Storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single('file');

router.post('/upload', async (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(404).send({ message: 'File Upload Failed' });
    const imageBuffer = await fs.promises.readFile(`./uploads/${req.file.originalname}`);
    Users.findOneAndUpdate(
      { username: req.body.user },
      { profileImage: imageBuffer, profileImageName: req.file.originalname },
      async (error, foundUser) => {
        if (error) {
          return res.status(500).send({ message: 'Error updating user' });
        } else {
          if (imageBuffer) {
            const profileImage = Buffer.from(imageBuffer, 'binary').toString('base64');
            return res.status(200).send({ filename: req.file.originalname, profileImage });
          }
          return res.status(200).send({ filename: req.file.originalname });
        }
      }
    );
  });
});

module.exports = router;
