// Fake database model.
//
// Mimics the API of Sequelize Models.
//

// User database
// Maps user id -> user instance
//
var users = {};

// User constructor
//
function User() {
  this.id = Date.now() + '-' + Math.random();
  this.cart = [];
}

exports.find = function(id) {
  return users[id];
};

exports.create = function() {
  var user = new User();
  return users[user.id] = user;
};
