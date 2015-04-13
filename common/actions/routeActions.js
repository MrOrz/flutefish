var router = require('../config/router');

module.exports = function(context) {
  return {
    goTo: function(path, poppedState) {
      console.log('Matching route for path', path);
      // Get corresponding route object and dispatch it to store
      //
      var route = router.getRoute(path);
      if (!route) {
        return Promise.reject('Not found');
      }

      context.dispatch('ROUTE_CHANGE', route);

      if (typeof window !== 'undefined') {
        window.history.pushState({
          path: path,
          scrollPositionBeforePush: document.body.scrollTop
        }, null, path);
      }

      // Call data-fetching actions to populate stores with essential data,
      // then determine page title
      //
      switch (route.name){
      case 'products':
        return context.getActions('productActions').all()
                      .then(doScroll)
                      .then(function() {
          return {
            title: '所有商品 :: Flutefish'
          }
        });

      case 'product':
        return context.getActions('productActions').get(route.params.id)
                      .then(doScroll)
                      .then(function() {
          var product = context.getStore('ProductStore').get(route.params.id);
          return {
            title: product.name + ' :: Flutefish',
            ogImage: product.image
          }
        });
      }

      function doScroll() {
        if (typeof window === 'undefined') {
          return Promise.resolve();
        } else {
          console.log('poppedState', poppedState);
          window.scrollTo(
            0, (poppedState && poppedState.scrollPositionBeforePush) || 0
          );
          return Promise.resolve();
        }
      }
    }
  };

};

