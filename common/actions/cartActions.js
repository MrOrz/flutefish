var fetch = require('../utils/fetch');

module.exports = function(context) {
  return {
    all: function() {
      context.dispatch('CART_LOADING');
      return fetch('/api/cart').then(function(res) {
        return res.json();
      }).then(function(data) {
        context.dispatch('SET_CART', data);
      });
    },

    add: function(productId) {
      var header = new Headers();
      header.append('Content-Type', 'application/json');

      return fetch('/api/cart/', {
        method: 'post',
        headers: header,
        body: JSON.stringify({productId: productId})
      }).then(function(res) {
        return res.json();
      }).then(function(data) {
        context.dispatch('SET_CART', data);
      });
    },

    remove: function(productId) {
      return fetch('/api/cart/' + productId, {
        method: 'delete'
      }).then(function(res) {
        return res.json()
      }).then(function(data) {
        context.dispatch('SET_CART', data);
      })
    }
  }
};
