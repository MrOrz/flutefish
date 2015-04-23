var dispatcher = require('../dispatcher'),
    fetch = require('../utils/fetch');

module.exports = {
  all: function() {
    return fetch('/api/products').then(function(res) {
      return res.json();
    }).then(function(data) {
      dispatcher.dispatch({actionType: 'SET_PRODUCTS', data: data});
    });
  },

  get: function(id) {
    return fetch('/api/products/' + id).then(function(res) {
      return res.ok ? res.json() : Promise.reject('Not found');
    }).then(function(data) {
      dispatcher.dispatch({actionType: 'SET_PRODUCT', data: data});
    });
  }
};
