var ProductStore = require('./ProductStore'),

    // Hard-code some products in cart for demo purposes
    //
    cartProductIds = ['mola', 'mola-mola', 'flutefish'];

module.exports = {
  all: function() {
    return cartProductIds.map(function(id) {
      return ProductStore.get(id);
    });
  },

  allIds: function() {
    return cartProductIds;
  }
};
