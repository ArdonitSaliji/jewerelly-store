const express = require('express');
const router = express.Router();

const verifyJWT = require('../middleware/verifyJWT');
const stripe = require('stripe');
const Users = require('../Schema/Users.js');
const Products = require('../Schema/Products.js');

let stripeGateway = stripe(
  'sk_test_51MCkXgDplZI5a2XjhslbZ4ge0UxGgEIAOvgGnpRRwta6scGnPvWFBlvaYhYqAXvnHK58tHwnUw133AZOpIma1H4q005lxIADbl'
);

let DOMAIN = 'http://localhost:3000/';

router.post('/checkout', verifyJWT, async (req, res) => {
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

router.post('/cart/delete', verifyJWT, async (req, res) => {
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
      res.status(200).send(basketProducts);
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

module.exports = router;
