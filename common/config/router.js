var Router = require('routr'),

    config = {
      products: {
        path: '/',
        method: 'get'
      },
      product: {
        path: '/products/:id',
        method: 'get'
      },
      cart: {
        path: '/cart',
        method: 'get'
      }
    };

module.exports = new Router(config);

// Also export config to easily get route name -> route mapping
module.exports.config = config;
