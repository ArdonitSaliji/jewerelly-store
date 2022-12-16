const express = require('express');
const router = express.Router();
const Users = require('./Schema/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Products = require('./Schema/Products');
router.get('/api/products', async (req, res) => {
  let allProducts = await Products.find({});
  if (allProducts) {
    res.status(200).json(allProducts);
  } else {
    return res.send(404);
  }
});

router.post('/api/products/select', async (req, res) => {
  let foundProduct = await Products.find({ name: req.body.name });
  foundProduct
    ? res.status(202).json(foundProduct)
    : res.status(204).send({ message: 'No Products Available' });
});

router.post('/api/products/find', async (req, res) => {
  let foundProduct = await Products.find({ name: req.body.name, shape: req.body.shape });
  foundProduct
    ? res.status(202).json(foundProduct)
    : res.status(204).send({ message: 'No Products Available' });
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

  if (!foundUser) {
    return res.status(404).send({ login: 'Account does not exist' });
  }
  if (foundUser) {
    bcrypt.compare(userLoggingIn.password, foundUser.password, (err, user) => {
      if (user) {
        const signUser = { username: emailOrUsername };
        const accessToken = jwt.sign(signUser, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '1d',
        });

        req.session.user = user;
        req.session.emailOrUsername = emailOrUsername;
        res.status(200).json({
          auth: true,
          accessToken: accessToken,
          user: req.session.emailOrUsername,
          username: emailOrUsername,
          msg: 'login successful',
        });
      } else {
        res.status(401).send({ msg: 'Incorrect Username/Email or Password' });
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

// router.post('/user/update/cart', async (req, res) => {
//   const username = JSON.parse(sessionStorage.getItem('user'));
//   const user = await Users.findOne({
//     username: username,
//   });

//   user.cart.insert(req.body.product);
//   res.send({ msg: 'success' });
// });
