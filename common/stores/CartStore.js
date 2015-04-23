var createEmitter = require('../utils/createEmitter'),
    constants = require('../config/constants'),
    assign = require('object-assign');

module.exports = function(context) {

  // Product ids for "cart", in display order.
  //
  var cartProductIds = [],

      // If cartProductIds is populated in store.
      // React components can check this before it before dispatching actions.
      //
      hasInitialized = false;

  return createEmitter({
    _onCartLoading: function() {
      hasInitialized = false;
      this.emit(constants.CHANGE);
    },

    _onSetCart: function(products) {

      // Wait for product store to populate the cart product data
      context.waitFor(['ProductStore']);

      cartProductIds = products.map(function(product) {return product.id;});
      hasInitialized = true;

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

    hasInitialized: function() {
      return hasInitialized;
    },

    dehydrate: function() {
      return [cartProductIds, hasInitialized];
    },

    rehydrate: function(state) {
      cartProductIds = state[0];
      hasInitialized = state[1];
    }
  });
};
