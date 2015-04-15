var fetch = require('isomorphic-fetch'),
    constants = require('../config/constants');

module.exports = function(context) {
  return {
    all: function() {
      return fetch(constants.API_HOST + '/api/cart').then(function(res) {
        return res.json();
      }).then(function(data) {
        context.dispatch('SET_CART', data);
      });
    },

    add: function(productId) {
      var header = new Headers();
      header.append('Content-Type', 'application/json');

      return fetch(constants.API_HOST + '/api/cart/', {
        method: 'post',
        headers: header,
        body: JSON.stringify({productId: productId})
      }).then(function(res){
        return res.json();
      }).then(function(data){
        context.dispatch('SET_CART', data);
      });
    },

    remove: function(productId) {
      return fetch(constants.API_HOST + '/api/cart/' + productId, {
        method: 'delete'
      }).then(function(res){
        return res.json()
      }).then(function(data){
        context.dispatch('SET_CART', data);
      })
    }
  }
};
