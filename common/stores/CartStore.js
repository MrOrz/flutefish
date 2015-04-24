var dispatcher = require('../dispatcher'),
    createEmitter = require('../utils/createEmitter'),
    constants = require('../config/constants'),

    ProductStore = require('./ProductStore'),

    CartStore,
    cartProductIds = [];

module.exports = CartStore = createEmitter({
  _onAdd: function(productId) {
    cartProductIds.push(productId);
    this.emit(constants.CHANGE);
  },

  _onRemove: function(productId) {
    var idx = cartProductIds.indexOf(productId);
    if (idx !== -1) {
      cartProductIds.splice(idx, 1);
      this.emit(constants.CHANGE);
    }
  },

  all: function() {
    return cartProductIds.map(function(id) {
      return ProductStore.get(id);
    });
  },

  allIds: function() {
    return cartProductIds;
  }
});

dispatcher.register(function(payload) {
  switch (payload.actionType) {
  case 'ADD_TO_CART':
    CartStore._onAdd(payload.data);
    break;
  case 'REMOVE_FROM_CART':
    CartStore._onRemove(payload.data);
    break;
  }
});
