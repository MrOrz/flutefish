var dispatcher = require('../dispatcher'),
    router = require('../config/router'),
    constants = require('../config/constants');

module.exports = {
  goTo: function(path, poppedState) {
    console.log('[routeActions.goTo] Matching route for path', path);
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
    dispatcher.dispatch({actionType: 'ROUTE_CHANGE', data: route});

    if (constants.IS_BROWSER) {
      // Restore old scrolling position, or to the top
      //
      window.scrollTo(
        0, (poppedState && poppedState.scrollPositionBeforePush) || 0
      );
    }
  },

  setMeta: function(obj) {
    dispatcher.dispatch({actionType: 'SET_META', data: obj});
  }
};
