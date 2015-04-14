var router = require('../config/router'),
    constants = require('../config/constants');

module.exports = function(context) {

  // Call data-fetching actions to populate stores with essential data,
  // then determine page title
  //
  function fetchDataAndSetMeta () {
    var route = context.getStore('RouteStore').get(),
        promises = [];

    // Invoke cartActions.get no matter what pages
    //
    promises.push(context.getActions('cartActions').all());

    switch (route.name){
    case 'products':
      promises.push(context.getActions('productActions').all().then(function() {
        return {
          title: '所有商品 :: Flutefish'
        }
      }));
      break;

    case 'product':
      promises.push(context.getActions('productActions').get(
        route.params.id
      ).then(function() {
        var product = context.getStore('ProductStore').get(route.params.id);
        return {
          title: product.name + ' :: Flutefish',
          ogImage: product.image
        }
      }));
      break;
    }

    return Promise.all(promises).then(function(resolvedData) {
      return resolvedData[resolvedData.length - 1]; // last promise = meta
    });
  }

  return {
    goTo: function(path, poppedState) {
      console.log('Matching route for path', path);
      // Get corresponding route object and dispatch it to store
      //
      var route = router.getRoute(path);

      if (!route) {
        return Promise.reject('Not found');
      }

      if (constants.IS_BROWSER && !poppedState) {
        // Change URL if the user is not hitting the back / forward button
        //
        window.history.pushState({
          path: path,

          // Before route change, memorize current scrolling position.
          scrollPositionBeforePush: document.body.scrollTop
        }, null, path);
      }

      // Dispatch route change.
      // This will trigger change callback of the components and thus
      // change the content of the app.
      //
      context.dispatch('ROUTE_CHANGE', route);

      if (constants.IS_BROWSER) {
        // Restore old scrolling position, or to the top
        //
        window.scrollTo(
          0, (poppedState && poppedState.scrollPositionBeforePush) || 0
        );
      }

      return fetchDataAndSetMeta().then(function(meta) {
        if (constants.IS_BROWSER) {
          document.title = meta.title;
        }
        return meta;
      });
    }
  };

};

