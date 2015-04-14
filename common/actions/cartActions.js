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
    }
  }
};
