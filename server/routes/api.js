var express = require('express'),
    Product = require('../models/product'),
    router = express.Router();

router.get('/products', function(req, res) {
  Product.find({
    // Only return product name and thumbnail to save bandwidth.
    //
    attributes: ['id', 'name', 'thumbnail']
  }).then(function(records) {
    res.json(records);
  });
});

router.get('/products/:id', function(req, res) {
  Product.find(req.params.id).then(function(product) {
    if (product) {
      res.json(product);
    } else {
      res.sendStatus(404);
    }
  });
});

router.get('/cart', function(req, res) {
  fetchProductsByIds(req.user.cart).then(function(records) {
    res.json(records);
  });
});

router.post('/cart', function(req, res) {
  var cart = req.user.cart,
      productId = req.body.productId,
      idx = cart.indexOf(productId);

  if (!productId) {
    res.status(400);
  }else {
    // Do not push to cart twice
    //
    if (idx === -1) {
      // Push to cart only if product id is valid.
      //
      Product.find(productId).then(function(product) {
        if (product) {
          cart.push(productId);
        } else {
          res.status(422); // Unprocessible Entity
        }
      }).then(function() {
        return fetchProductsByIds(cart);
      }).then(function(records) {
        res.json(records);
      });
      return;
    }else {
      res.status(422); // Unprocessible Entity
    }
  }

  fetchProductsByIds(cart).then(function(records) {
    res.json(records);
  });

});

router.delete('/cart/:productId', function(req, res) {
  var cart = req.user.cart,
      idx = cart.indexOf(req.params.productId);

  if (idx === -1) { // Not found
    res.status(422); // Unprocessible Entity
  }else {
    cart.splice(idx, 1);
  }

  fetchProductsByIds(cart).then(function(records) {
    res.json(records);
  });
});

function fetchProductsByIds(ids) {
  // Fetch product as a list and include its price for calculation.
  //
  return Product.find({
    where: {id: ids},
    attributes: ['id', 'name', 'thumbnail', 'price']
  });
}

module.exports = router;
