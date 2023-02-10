const express = require('express');
const router = express.Router();
const Products = require('../Schema/Products.js');

// router.get('/', async (req, res) => {
//   let allProducts = await Products.find({});
//   if (allProducts) {
//     res.status(200).json(allProducts);
//   } else {
//     return res.send(404);
//   }
// });

router.get('/', async (req, res) => {
  let foundProduct = await Products.find({
    $expr: { $gt: [{ $strLenCP: '$text' }, 1] },
  });
  foundProduct
    ? res.status(202).send(foundProduct)
    : res.status(204).send({ message: 'No Products Available' });
});

router.get('/:product', async (req, res) => {
  let foundProduct = await Products.find({
    name: { $regex: `^${req.params.product}` },
  });
  foundProduct
    ? res.status(202).json(foundProduct)
    : res.status(204).send({ message: 'No Products Available' });
});

router.post('/shape', async (req, res) => {
  let foundProductShapes = await Products.find({ name: req.body.name });
  res.status(202).json(foundProductShapes);
});

module.exports = router;
