var fetch = require('../utils/fetch');

module.exports = function(context) {
  return {
    all: function() {
      return fetch('/api/products').then(function(res) {
        return res.json();
      }).then(function(data) {
        context.dispatch('SET_PRODUCTS', data);
      });
    },

    get: function(id) {
      return fetch('/api/products/' + id).then(function(res) {
        return res.ok ? res.json() : Promise.reject('Not found');
      }).then(function(data) {
        context.dispatch('SET_PRODUCT', data);
      });
    }
  }
};
