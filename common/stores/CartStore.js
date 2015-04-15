var createEmitter = require('../utils/createEmitter'),
    constants = require('../config/constants'),
    assign = require('object-assign');

module.exports = function(context) {

  // Product ids for "cart", in display order.
  //
  var orderedIds = [];

  return createEmitter({
    _setCartList: function(products) {

      // Wait for product store to populate the cart product data
      context.waitFor(['ProductStore']);

      orderedIds = products.map(function(product) {return product.id;});

      this.emit(constants.CHANGE);
    },

    all: function() {
      var productStore = context.getStore('ProductStore');

      return orderedIds.map(function(id) {
        return productStore.get(id);
      });
    },

    allIds: function() {
      return orderedIds;
    },

    dehydrate: function() {
      return orderedIds;
    },

    rehydrate: function(state) {
      orderedIds = state;
    }
  });
};
