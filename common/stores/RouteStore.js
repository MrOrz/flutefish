var dispatcher = require('../dispatcher'),
    createEmitter = require('../utils/createEmitter'),
    constants = require('../config/constants'),

    RouteStore,

    // Routr route object
    //
    currentRoute,

    // Metadata for current webpage, like title, ogImage, etc.
    //
    meta = {};

module.exports = RouteStore = createEmitter({
  _onRouteChange: function(route) {
    currentRoute = route;
    this.emit(constants.CHANGE);
  },

  _onSetMeta: function(newMeta) {
    meta = newMeta;

    meta.suffixedTitle = meta.title ?
                          meta.title + ' :: Flutefish' :
                          'Flutefish';

    this.emit(constants.CHANGE);
  },

  getRoute: function() {
    return currentRoute;
  },

  getMeta: function() {
    return meta;
  }
});

RouteStore.dispatchToken = dispatcher.register(function(payload) {
  switch (payload.actionType) {

  case 'ROUTE_CHANGE':
    RouteStore._onRouteChange(payload.data);
    break;

  case 'SET_META':
    RouteStore._onSetMeta(payload.data);
    break;
  }
})
