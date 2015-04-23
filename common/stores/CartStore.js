var dispatcher = require('../dispatcher'),
    createEmitter = require('../utils/createEmitter'),
    constants = require('../config/constants'),
    assign = require('object-assign'),

    ProductStore = require('./ProductStore'),

    CartStore,
    cartProductIds = [],

    // If cartProductIds is populated in store.
    // React components can check this before it before dispatching actions.
    //
    hasInitialized = false;

module.exports = CartStore = createEmitter({
  _onCartLoading: function() {
    hasInitialized = false;
    this.emit(constants.CHANGE);
  },

  _onSetCart: function(products) {

    // Wait for product store to populate the cart product data
    dispatcher.waitFor([ProductStore.dispatchToken]);

    cartProductIds = products.map(function(product) {return product.id;});
    hasInitialized = true;

    this.emit(constants.CHANGE);
  },

  all: function() {
    return cartProductIds.map(function(id) {
      return ProductStore.get(id);
    });
  },

  allIds: function() {
    return cartProductIds;
  },

  hasInitialized: function() {
    return hasInitialized;
  }
});

CartStore.dispatchToken = dispatcher.register(function(payload) {
  switch (payload.actionType) {

  case 'CART_LOADING':
    CartStore._onCartLoading();
    break;

  case 'SET_CART':
    CartStore._onSetCart(payload.data);
    break;
  }
});
