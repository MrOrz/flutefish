var express = require('express'),
    Product = require('./models/product'),
    app = express();

// Catch all unhandled promise rejections and print error.
// Ref: https://iojs.org/api/process.html#process_event_unhandledrejection
//
process.on('unhandledRejection', function(reason, promise) {
  console.error('[Unhandled Rejection] Reason:', reason);
  console.error('[Unhandled Rejection] Promise:', promise);
});

app.use(express.static('client'));

app.get('/api/products', function(req, res) {
  Product.all().then(function(products) {

    // Only return product name and thumbnail to save bandwidth.
    //
    res.json(Object.keys(products).map(function(productId) {
      return {
        id: productId,
        name: products[productId].name,
        thumbnail: products[productId].thumbnail
      };
    }));
  });
});

app.get('/api/product/:id', function(req, res) {
  Product.find(req.params.id).then(function(product) {
    res.json(product);
  });
});

// Catch-all route
//
app.get('*', function(req, res) {
  res.send('Hello World!');
});

var server = app.listen(5000, function() {
  console.log('Server listening at http://%s:%s',
              server.address().address, server.address().port);
});
