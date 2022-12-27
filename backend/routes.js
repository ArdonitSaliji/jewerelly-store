const stripe = require('stripe');
const express = require('express');
const router = express.Router();
const Users = require('./Schema/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Products = require('./Schema/Products');
let stripeGateway = stripe(
  'sk_test_51MCkXgDplZI5a2XjhslbZ4ge0UxGgEIAOvgGnpRRwta6scGnPvWFBlvaYhYqAXvnHK58tHwnUw133AZOpIma1H4q005lxIADbl'
);
let DOMAIN = 'http://localhost:3000/';
router.post('/user/checkout', async (req, res) => {
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

router.get('/api/products/find', async (req, res) => {
  let foundProduct = await Products.find({
    $expr: { $gt: [{ $strLenCP: '$text' }, 1] },
  });
  foundProduct
    ? res.status(202).json(foundProduct)
    : res.status(204).send({ message: 'No Products Available' });
});

router.post('/user/cart/add', async (req, res) => {
  let foundProduct = await Products.findOne({ name: req.body.product });
  let foundUser = await Users.findOne({
    username: req.body.user,
    'cart.product': foundProduct.name,
  });
  console.log(foundUser);
  if (foundUser) {
    return res.status(203).json({ message: 'Product already exists' });
  } else {
    await Users.findOne({ username: req.body.user }).updateOne({
      $push: { cart: { _id: foundProduct._id, product: foundProduct.name, quantity: 1 } },
    });
    return res.status(202).send(foundProduct);
  }
});

router.post('/user/cart/delete', async (req, res) => {
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

router.post('/user/cart/products', async (req, res) => {
  const foundUser = await Users.findOne({
    username: req.body.user,
  });
  if (foundUser) {
    const basketProducts = await Products.find({ _id: { $in: foundUser.cart } });

    return res.status(200).send({ basketProducts, foundUser });
  }
});

router.post('/api/products/select', async (req, res) => {
  let foundProduct = await Products.find({ name: { $regex: `^${req.body.name}` } });
  foundProduct
    ? res.status(202).json(foundProduct)
    : res.status(204).send({ message: 'No Products Available' });
});

router.get('/api/products', async (req, res) => {
  let allProducts = await Products.find({});
  if (allProducts) {
    res.status(200).json(allProducts);
  } else {
    return res.send(404);
  }
});

router.post('/api/products/find/shape', async (req, res) => {
  let foundProductShapes = await Products.find({ name: req.body.name });
  res.status(202).json(foundProductShapes);
});

const authenticateToken = async (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    res.status(401).send({ msg: 'No token provided!' });
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
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
  const emailOrUsername = req.body.email;

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
    return res.status(404).send({ error: 'Account does not exist' });
  }
  if (foundUser) {
    const basketProducts = await Products.find({ _id: { $in: foundUser.cart } });
    bcrypt.compare(userLoggingIn.password, foundUser.password, (err, user) => {
      if (user) {
        const signUser = { username: emailOrUsername };
        const accessToken = jwt.sign(signUser, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '1d',
        });

        req.session.user = user;
        res.status(200).json({
          auth: true,
          accessToken: accessToken,
          username: emailOrUsername,
          success: 'Login successful',
          isLoggedIn: true,
          basketProducts: basketProducts,
        });
      } else {
        res.status(401).send({ error: 'Incorrect Username/Email or Password' });
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
  if (takenEmail) {
    return res.status(409).json({ error: 'Email already exists!' });
  } else if (takenUsername) {
    return res.status(409).json({ error: 'Username already exists!' });
  } else {
    if (user.password1 === user.password2) {
      user.password1 = await bcrypt.hash(req.body.password1, 10);
      const dbUser = new Users({
        username: user.username,
        email: user.email,
        password: user.password1,
      });
      await dbUser.save();
      return res.status(201).json({ success: 'Account created successfully!' });
    }
  }
  res.status(403).json({ error: 'Passwords must be matching!' });
});

router.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('connect.sid'); // clean up!
  return res.status(200).json({ msg: 'logging you out' });
});
module.exports = router;
