var router = require('../config/router');

module.exports = function(context) {
  return {
    match: function(path) {
      console.log('Matching route for path', path);
      // Get corresponding route object and dispatch it to store
      //
      var route = router.getRoute(path);
      if (!route) {
        return Promise.reject('Not found');
      }

      context.dispatch('ROUTE_CHANGE', route);

      if (typeof window !== 'undefined') {
        window.history.pushState(route, null, path);
      }

      // Call data-fetching actions to populate stores with essential data,
      // then determine page title
      //
      switch (route.name){
      case 'products':
        return context.getActions('productActions').all().then(function() {
          return {
            title: '所有商品 :: Flutefish'
          }
        });

      case 'product':
        return context.getActions('productActions').get(route.params.id)
                      .then(function() {
          var product = context.getStore('ProductStore').get(route.params.id);
          return {
            title: product.name + ' :: Flutefish',
            ogImage: product.image
          }
        });
      }

    }
  };
};
