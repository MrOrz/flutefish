// Goflux app instance

var Goflux = require('goflux').Goflux,
    gofluxApp = new Goflux();

gofluxApp.defineActions('routeActions', require('./actions/routeActions'));
gofluxApp.defineActions('productActions', require('./actions/productActions'));

gofluxApp.defineStore('RouteStore', {
  ROUTE_CHANGE: '_setRoute'
}, require('./stores/RouteStore'));

gofluxApp.defineStore('ProductStore', {
  SET_PRODUCTS: '_setProductList',
  SET_PRODUCT: '_setProduct',
}, require('./stores/ProductStore'));

module.exports = gofluxApp;
