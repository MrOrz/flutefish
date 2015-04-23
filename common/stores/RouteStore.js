var createEmitter = require('../utils/createEmitter'),
    constants = require('../config/constants');

module.exports = function(context) {

  // Routr route object
  //
  var currentRoute,

      // Metadata for current webpage, like title, ogImage, etc.
      //
      meta = {};

  return createEmitter({
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
    },

    dehydrate: function() {
      return [currentRoute, meta];
    },

    rehydrate: function(state) {
      currentRoute = state[0];
      meta = state[1];
    }

  });
};
