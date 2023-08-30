const express = require('express');

const router = express.Router();

router.get('/:id/products/:productId', (req, res) => {
  const categoryId = req.params.id;
  const productId = req.params.productId;
  res.json({
    categoryId: categoryId,
    productId: productId,
  });
});

module.exports = router
