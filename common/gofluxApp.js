// Goflux app instance

var Goflux = require('goflux').Goflux,
    gofluxApp = new Goflux();

gofluxApp.defineActions('routeActions', require('./actions/routeActions'));
gofluxApp.defineActions('productActions', require('./actions/productActions'));
gofluxApp.defineActions('cartActions', require('./actions/cartActions'));

gofluxApp.defineStore('RouteStore', {
  ROUTE_CHANGE: '_onRouteChange'
}, require('./stores/RouteStore'));

gofluxApp.defineStore('ProductStore', {
  SET_PRODUCTS: '_onSetProducts',
  SET_PRODUCT: '_onSetProduct',
  SET_CART: '_onSetCart',
}, require('./stores/ProductStore'));

gofluxApp.defineStore('CartStore', {
  CART_LOADING: '_onCartLoading',
  SET_CART: '_onSetCart'
}, require('./stores/CartStore'));

module.exports = gofluxApp;
