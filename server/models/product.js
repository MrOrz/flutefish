// Fake database model.
//
// Mimics the API of Sequelize Models.
//
var assert = require('assert'),
    products = [
      {
        id: 'mola', name: 'Mola', price: 890,
        thumbnail: '/images/mola-bags.jpg',
        image: '/images/mola-bag.jpg'
      },
      {
        id: 'mola-light', name: 'Mola Light', price: 890,
        thumbnail: '/images/mola-ip1s.jpg',
        image: '/images/mola-ip1.jpg'
      },
      {
        id: 'mola-deep', name: 'Mola Deep', price: 890,
        thumbnail: '/images/mola-ip2s.jpg',
        image: '/images/mola-ip2.jpg'
      },
      {
        id: 'mola-mola', name: 'Mola Mola', price: 799,
        thumbnail: '/images/mola-ip3s.jpg',
        image: '/images/mola-ip3.jpg'
      },
      {
        id: 'mola-oao', name: 'Mola OAO', price: 799,
        thumbnail: '/images/mola-ip4s.jpg',
        image: '/images/mola-ip4.jpg'
      },
      {
        id: 'flutefish', name: 'Flutefish', price: 1099,
        thumbnail: '/images/flute-bag2s.jpg',
        image: '/images/flute-bag2.jpg'
      },
      {
        id: 'flute', name: 'Flute ∞', price: 1199,
        thumbnail: '/images/flute-bag1s.jpg',
        image: '/images/flute-bag1.jpg'
      }
    ];

/**
  Returns a promise that resolves to a product or list of products.
  Mimics Model#find in Sequelize.

  options [string | object]
  If options is a string, it is considered as the object id to retrieve.
  If options is an object, it is expected in the following manner:

  {
    attributes: [<columns to select>]
    where: {
      <column name>: [<enumerated values>]
    }
  }

  ref: http://sequelize.readthedocs.org/en/latest/api/model/#findalloptions-queryoptions-promisearrayinstance
*/
exports.find = function(options) {
  if (typeof options === 'string') {
    return Promise.resolve(products.filter(function(product) {
      return product.id === options
    })[0]);

  } else if (typeof options === 'object') {
    return Promise.resolve(products.filter(function(product) {
      var where = options.where,
          column, enumeratedValues;

      if (!where) {return true;}

      for (column in where) {
        if (!where.hasOwnProperty(column)) { continue; }

        enumeratedValues = where[column];
        assert((enumeratedValues instanceof Array),
               'Only {column: [list of values]} is implemented.');

        if (enumeratedValues.indexOf(product[column]) === -1) {
          return false;
        }
      }

      return true;
    }).map(function(product) {
      var attributes = options.attributes, record = {};

      if (!attributes) {return product};

      attributes.forEach(function(attribute) {
        record[attribute] = product[attribute];
      });

      return record;
    }));

  } else {
    throw Error('Unsupported options');
  }
};
