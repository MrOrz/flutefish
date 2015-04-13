var createEmitter = require('../utils/createEmitter'),
    constants = require('../config/constants');

module.exports = function(context) {
  var currentRoute;

  return createEmitter({
    _setRoute: function(route) {
      currentRoute = route;
      this.emit(constants.CHANGE);
    },
    get: function() {
      return currentRoute;
    }
  });
};
