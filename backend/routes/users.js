const express = require('express');
const router = express.Router();

const verifyJWT = require('../middleware/verifyJWT');
const stripe = require('stripe');
const Users = require('../Schema/Users.js');
const Products = require('../Schema/Products.js');
const bcrypt = require('bcrypt');
const verifySession = require('../middleware/verifySession');
const bodyParser = require('body-parser');

let stripeGateway = stripe(
  'sk_test_51MCkXgDplZI5a2XjhslbZ4ge0UxGgEIAOvgGnpRRwta6scGnPvWFBlvaYhYqAXvnHK58tHwnUw133AZOpIma1H4q005lxIADbl'
);

let DOMAIN = 'http://localhost:3000/';
router.use(bodyParser.json());

router.post('/checkout', async (req, res) => {
  const session = await stripeGateway.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: DOMAIN,
    cancel_url: `${DOMAIN}basket`,
    line_items: req.body.items.map((item) => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name.slice(0, -1),
            description: item.size,
          },
          unit_amount: Number(item.price.split('$').join('')) * 100,
        },
        quantity: 1,
      };
    }),
  });
  res.status(200).json(session.url);
});

router.post('/cart/add', async (req, res) => {
  let foundProduct = await Products.findOne({ name: req.body.product });
  let foundUser = await Users.findOne({
    username: req.body.user,
    'cart.product': foundProduct.name,
  });
  if (foundUser) {
    return res.status(203).json({ message: 'Product already exists' });
  } else {
    await Users.findOne({ username: req.body.user }).updateOne({
      $push: {
        cart: {
          _id: foundProduct._id,
          product: foundProduct.name,
          quantity: 1,
        },
      },
    });
    return res.status(202).send(foundProduct);
  }
});

router.post('/cart/delete', async (req, res) => {
  const user = await Users.updateOne(
    { username: req.body.user },
    {
      $pull: { cart: { product: req.body.productName } },
    }
  );
  if (user) {
    const foundUser = await Users.findOne({
      username: req.body.user,
    });
    const values = foundUser.cart.map((prod) => prod.product);
    if (foundUser) {
      const basketProducts = await Products.find({
        name: { $in: values },
      });
      return res.status(200).send(basketProducts);
    }
  } else {
    res.status(401);
  }
});

router.post('/cart/products', async (req, res) => {
  const foundUser = await Users.findOne({
    username: req.body.user,
  });
  if (foundUser) {
    const basketProducts = await Products.find({
      _id: { $in: foundUser.cart },
    });
    return res.status(200).send({ basketProducts, foundUser });
  }
});

router.post('/:user/profile', verifyJWT, verifySession, async (req, res) => {
  const foundUser = await Users.findOne({
    username: req.body.user,
  });
  if (foundUser.profileImage) {
    const image = Buffer.from(foundUser.profileImage, 'binary').toString('base64');
    res.status(200).send({ user: foundUser, image: image });
  } else {
    res.status(200).send({ user: foundUser, image: '' });
  }
});

router.post('/user/update-profile', verifyJWT, async (req, res) => {
  const user = req.body;
  const update = {};
  if (user.profileImage) {
    update.profileImage = user.profileImage;
  }
  if (user.password) {
    update.password = await bcrypt.hash(user.password, 10);
  }
  if (user.email) {
    update.email = user.email;
  }
  if (user.username) {
    update.username = user.username;
  }
  // Find the user in the database
  const existingUser = await Users.findById(user._id);
  // Check if the email or username is already in use
  if (
    (update.email &&
      update.email !== existingUser.email &&
      (await Users.exists({ email: update.email }))) ||
    (update.username &&
      update.username !== existingUser.username &&
      (await Users.exists({ username: update.username })))
  ) {
    res.status(400).send({ message: 'Email or username is already in use' });
  } else {
    // Update the user's profile
    Users.findByIdAndUpdate(user._id, update, (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send({
          message: 'Profile updated successfully',
          username: user.username,
        });
      }
    });
  }
});

module.exports = router;
