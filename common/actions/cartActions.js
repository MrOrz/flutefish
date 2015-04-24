var dispatcher = require('../dispatcher');

module.exports = {
  add: function(productId) {
    dispatcher.dispatch({actionType: 'ADD_TO_CART', data: productId});
  },

  remove: function(productId) {
    dispatcher.dispatch({actionType: 'REMOVE_FROM_CART', data: productId});
  }
};
