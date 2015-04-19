var createEmitter = require('../utils/createEmitter'),
    constants = require('../config/constants'),
    assign = require('object-assign');

module.exports = function(context) {

  // Product id --> product instance.
  // "Single source of truth" for the products.
  var products = {},

      // Product ids for "all" list, in display order.
      // Larger websites may have multiple lists of ids like this.
      //
      orderedIds = [];

  return createEmitter({
    _setSingleProduct: function(product) {
      if (products[product.id]) {
        assign(products[product.id], product);
      } else {
        products[product.id] = product;
      }
    },

    _setProducts: function(newProducts) {
      newProducts.forEach(function(product) {
        this._setSingleProduct(product);
      }.bind(this));
    },

    _onSetProduct: function(product) {
      this._setSingleProduct(product);
      this.emit(constants.CHANGE);
    },

    _onSetProducts: function(newProducts) {
      if (newProducts) {

        this._setProducts(newProducts)
        // Update orderedIds.
        orderedIds = newProducts.map(function(product) {return product.id});

        this.emit(constants.CHANGE);
      }
    },

    _onSetCart: function(newProducts) {
      if (newProducts) {
        this._setProducts(newProducts);
        this.emit(constants.CHANGE);
      }
    },

    all: function() {
      return orderedIds.map(function(id) {
        return products[id];
      });
    },
    get: function(id) {
      return products[id];
    },
    dehydrate: function() {
      return [products, orderedIds];
    },
    rehydrate: function(state) {
      products = state[0];
      orderedIds = state[1];
    }
  });
};
