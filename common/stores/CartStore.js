var createEmitter = require('../utils/createEmitter'),
    constants = require('../config/constants'),
    assign = require('object-assign');

module.exports = function(context) {

  // Product ids for "cart", in display order.
  //
  var cartProductIds = [],

      // If we are currently fetching cart from server.
      // Default to true so that it looks like its loading at first.
      //
      isLoading = true;

  return createEmitter({
    _onCartLoading: function() {
      isLoading = true;
      this.emit(constants.CHANGE);
    },

    _onSetCart: function(products) {

      // Wait for product store to populate the cart product data
      context.waitFor(['ProductStore']);

      cartProductIds = products.map(function(product) {return product.id;});
      isLoading = false;

      this.emit(constants.CHANGE);
    },

    all: function() {
      var productStore = context.getStore('ProductStore');

      return cartProductIds.map(function(id) {
        return productStore.get(id);
      });
    },

    allIds: function() {
      return cartProductIds;
    },

    isLoading: function() {
      return isLoading;
    },

    dehydrate: function() {
      return cartProductIds;
    },

    rehydrate: function(state) {
      cartProductIds = state;
    }
  });
};
