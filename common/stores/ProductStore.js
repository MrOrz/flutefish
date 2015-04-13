var createEmitter = require('../utils/createEmitter'),
    constants = require('../config/constants');

module.exports = function(context) {
  var products = [];

  return createEmitter({
    _setProducts: function(newProducts) {
      if (newProducts) {
        products = newProducts.slice(0);
        this.emit(constants.CHANGE);
      }
    },
    all: function() {
      return products;
    },
    get: function(id) {
      return products.filter(function(product) {return product.id === id})[0];
    },
    dehydrate: function() {
      return products;
    },
    rehydrate: function(state) {
      products = state;
    }
  });
};
