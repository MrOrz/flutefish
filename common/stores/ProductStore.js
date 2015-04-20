var createEmitter = require('../utils/createEmitter'),
    constants = require('../config/constants'),
    assign = require('object-assign');

module.exports = function(context) {

  // Product id --> product instance.
  // "Single source of truth" for the products.
  var products = {},

      // Product ids for "all" list, in display order.
      //
      allProductIds = [],

      // If any data is populated in store.
      // React components can check this before it make requests to API.
      //
      hasInitialized = false;

  return createEmitter({
    _setSingleProduct: function(product) {
      // Given a productInstance {id: productId, props...},
      // put it in the productId -> productInstance map.
      //

      if (products[product.id]) {
        // Product already exists, just update
        //
        assign(products[product.id], product);
      } else {
        products[product.id] = product;
      }

      hasInitialized = true;
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
        // Update allProductIds.
        allProductIds = newProducts.map(function(product) {return product.id});

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
      return allProductIds.map(function(id) {
        return products[id];
      });
    },
    get: function(id) {
      return products[id];
    },

    hasInitialized: function() {
      return hasInitialized;
    },

    dehydrate: function() {
      return [products, allProductIds];
    },
    rehydrate: function(state) {
      products = state[0];
      allProductIds = state[1];
    }
  });
};
