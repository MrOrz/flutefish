// Fake database model.
//
// Mimics the API of Sequelize Models.
//

var products = {
  'mola': {name: 'Mola', thumbnail: '', price: 890, image: ''},
  'mola-mola': {name: 'Mola', thumbnail: '', price: 799, image: ''}
};

// Returns a promise that resolves to all products
//
exports.all = function() {
  return Promise.resolve(products);
};

// Returns a promise that resolves to one single product
//
exports.find = function(id) {
  return Promise.resolve(products[id]);
};
