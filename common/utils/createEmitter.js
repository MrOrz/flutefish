// Adding EventEmitter.prototype to store instance.
// Ref: https://facebook.github.io/flux/docs/todo-list.html#creating-stores
//
var EventEmitter = require('events').EventEmitter,
    assign = require('object-assign');

module.exports = function(instance) {
  return assign({}, EventEmitter.prototype, instance);
};
