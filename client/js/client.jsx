// Require jQuery and bootstrap
//
require('expose?jQuery!expose?$!jquery'); // expose "jQuery" and "$" to window
require('bootstrap');

// Trigger CSS processing
require('../css/client.css');

var React = require('react'),
    App = require('../../common/views/App.jsx'),
    constants = require('../../common/config/constants'),

    RouteStore = require('../../common/stores/RouteStore'),
    routeActions = require('../../common/actions/routeActions');

routeActions.goTo(window.location.pathname);

React.render((
  <App />
), document.getElementById('react-root'));

// Bind back-button / forward button listener
//
window.addEventListener('popstate', function(evt) {
  routeActions.goTo(
    window.location.pathname,
    evt.state
  );
});

// Set document title when meta data changes
//
RouteStore.addListener(constants.CHANGE, function() {
  var meta = RouteStore.getMeta();
  document.title = meta.suffixedTitle;
});
