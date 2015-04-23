var dispatcher = require('../dispatcher'),
    fetch = require('../utils/fetch');

module.exports = {
  all: function() {
    dispatcher.dispatch({actionType: 'CART_LOADING'});
    return fetch('/api/cart').then(function(res) {
      return res.json();
    }).then(function(data) {
      dispatcher.dispatch({actionType: 'SET_CART', data: data});
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
      dispatcher.dispatch({actionType: 'SET_CART', data: data});
    });
  },

  remove: function(productId) {
    return fetch('/api/cart/' + productId, {
      method: 'delete'
    }).then(function(res) {
      return res.json()
    }).then(function(data) {
      dispatcher.dispatch({actionType: 'SET_CART', data: data});
    })
  }
};
