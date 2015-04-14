// Goflux app instance

var Goflux = require('goflux').Goflux,
    gofluxApp = new Goflux();

gofluxApp.defineActions('routeActions', require('./actions/routeActions'));
gofluxApp.defineActions('productActions', require('./actions/productActions'));
gofluxApp.defineActions('cartActions', require('./actions/cartActions'));

gofluxApp.defineStore('RouteStore', {
  ROUTE_CHANGE: '_setRoute'
}, require('./stores/RouteStore'));

gofluxApp.defineStore('ProductStore', {
  SET_PRODUCTS: '_setProductList',
  SET_PRODUCT: '_setProduct',
  SET_CART: '_setProductList',
}, require('./stores/ProductStore'));

gofluxApp.defineStore('CartStore', {
  SET_CART: '_setCartList',
}, require('./stores/CartStore'));

module.exports = gofluxApp;
