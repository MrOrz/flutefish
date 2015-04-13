// Server entry point
//

// Babel takes care of jsx parsing & requiring.
require('babel/register');

var express = require('express'),
    Product = require('./models/product'),
    User = require('./models/user'),
    app = express(),

    React = require('react'),
    ServerIndex = require('./views/index.jsx');

// Catch all unhandled promise rejections and print error.
// Ref: https://iojs.org/api/process.html#process_event_unhandledrejection
//
process.on('unhandledRejection', function(reason, promise) {
  console.error('[Unhandled Rejection] Reason:', reason);
  console.error('[Unhandled Rejection] Promise:', promise);
});

//
// Common middlewares
//
app.use(express.static('client'));
app.use(require('cookie-parser')(process.env.COOKIE_SECRET || 'cookie secret'));

// Parses post requests in application/json
app.use(require('body-parser').json());

//
// Authentication middleware. Populates req.user and sets cookie.
//
app.use(function(req, res, next) {
  var userId = req.signedCookies.userId;

  req.user = (userId && User.find(userId)) || User.create();
  res.cookie('userId', req.user.id, {
    httpOnly: true, signed: true, expires: new Date('2099/12/31')
  });

  next();
});

//
// API endpoints
//
app.get('/api/products', function(req, res) {
  Product.find({
    // Only return product name and thumbnail to save bandwidth.
    //
    attributes: ['id', 'name', 'thumbnail']
  }).then(function(records) {
    res.json(records);
  });
});

app.get('/api/product/:id', function(req, res) {
  Product.find(req.params.id).then(function(product) {
    res.json(product);
  });
});

app.get('/api/cart', function(req, res) {
  Product.find({
    where: {id: req.user.cart},
    attributes: ['id', 'name', 'thumbnail', 'price']
  }).then(function(records) {
    res.json(records);
  });
});

app.post('/api/cart', function(req, res) {
  var cart = req.user.cart,
      productId = req.body.productId,
      idx = cart.indexOf(productId);

  if (!productId) {
    res.status(400);
    res.json(cart);
    return;
  }

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
      res.json(cart);
    });
  }else {
    res.status(422); // Unprocessible Entity
    res.json(cart);
  }
});

app.delete('/api/cart/:productId', function(req, res) {
  var cart = req.user.cart,
      idx = cart.indexOf(req.params.productId);

  if (idx === -1) { // Not found
    res.status(422); // Unprocessible Entity
  }else {
    cart.splice(idx, 1);
  }
  res.json(cart);
});

//
// Catch-all route
//
app.get('*', function(req, res) {

  // Invoke route action
  // TODO

  // Create app element & the index wrapper element
  //
  var app = React.createElement('h1', {}, 'Hello World'),
      index = React.createElement(ServerIndex, {
        renderedApp: React.renderToString(app),
        dehydratedScript: 'var apple = "Banana!";'
      });

  res.send(React.renderToStaticMarkup(index));
});

var server = app.listen(process.env.PORT || 5000, function() {
  console.log('Server listening at http://%s:%s',
              server.address().address, server.address().port);
});
