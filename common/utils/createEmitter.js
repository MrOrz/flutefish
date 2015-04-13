var EventEmitter = require('events').EventEmitter;

module.exports = function(instance) {
  instance.addListener = EventEmitter.prototype.addListener;
  instance.removeListener = EventEmitter.prototype.removeListener;
  instance.emit = EventEmitter.prototype.emit;
  return instance;
};
