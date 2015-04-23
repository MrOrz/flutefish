var dispatcher = require('../dispatcher'),
    createEmitter = require('../utils/createEmitter'),
    constants = require('../config/constants'),
    assign = require('object-assign'),

    ProductStore,

    // Product id --> product instance.
    // "Single source of truth" for the products.
    products = {},

    // Product ids for "all" list, in display order.
    //
    allProductIds = [],

    // If allProductIds is populated in store.
    // React components can check this before dispatching actions.
    //
    hasInitialized = false;

module.exports = ProductStore = createEmitter({
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
      hasInitialized = true;

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
  }
});

ProductStore.dispatchToken = dispatcher.register(function(payload) {
  switch (payload.actionType){

  case 'SET_PRODUCTS':
    ProductStore._onSetProducts(payload.data);
    break;

  case 'SET_PRODUCT':
    ProductStore._onSetProduct(payload.data);
    break;

  case 'SET_CART':
    ProductStore._onSetCart(payload.data);
    break;
  }
});
