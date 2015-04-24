// Product id --> product instance.
// "Single source of truth" for the products.
var products = {
      'mola': {
        id: 'mola', name: 'Mola', price: 890,
        thumbnail: '/images/mola-bags.jpg',
        image: '/images/mola-bag.jpg'
      },
      'mola-light': {
        id: 'mola-light', name: 'Mola Light', price: 890,
        thumbnail: '/images/mola-ip1s.jpg',
        image: '/images/mola-ip1.jpg'
      },
      'mola-deep': {
        id: 'mola-deep', name: 'Mola Deep', price: 890,
        thumbnail: '/images/mola-ip2s.jpg',
        image: '/images/mola-ip2.jpg'
      },
      'mola-mola': {
        id: 'mola-mola', name: 'Mola Mola', price: 799,
        thumbnail: '/images/mola-ip3s.jpg',
        image: '/images/mola-ip3.jpg'
      },
      'mola-oao': {
        id: 'mola-oao', name: 'Mola OAO', price: 799,
        thumbnail: '/images/mola-ip4s.jpg',
        image: '/images/mola-ip4.jpg'
      },
      'flutefish': {
        id: 'flutefish', name: 'Flutefish', price: 1099,
        thumbnail: '/images/flute-bag2s.jpg',
        image: '/images/flute-bag2.jpg'
      },
      'flute': {
        id: 'flute', name: 'Flute ∞', price: 1199,
        thumbnail: '/images/flute-bag1s.jpg',
        image: '/images/flute-bag1.jpg'
      }
    },

    // Product ids for "all" list, in display order.
    //
    allProductIds = [
      'mola', 'mola-light', 'mola-deep', 'mola-mola', 'mola-oao',
      'flutefish', 'flute'
    ];

module.exports = {
  all: function() {
    return allProductIds.map(function(id) {
      return products[id];
    });
  },
  get: function(id) {
    return products[id];
  }
};
