// Require jQuery and bootstrap
//
require('expose?jQuery!expose?$!jquery'); // expose "jQuery" and "$" to window
require('bootstrap');

// Trigger CSS processing
require('../css/client.css');

var React = require('react'),
    App = require('../../common/views/App.jsx'),
    gofluxApp = require('../../common/gofluxApp'),
    context = gofluxApp.createContext(),
    constants = require('../../common/config/constants');

context.getActions('routeActions').goTo(window.location.pathname);

React.render((
  <App gofluxContext={context} />
), document.getElementById('react-root'));

// Bind back-button / forward button listener
//
window.addEventListener('popstate', function(evt) {
  context.getActions('routeActions').goTo(
    window.location.pathname,
    evt.state
  );
});

// Set document title when meta data changes
//
context.getStore('RouteStore').addListener(constants.CHANGE, function() {
  var meta = context.getStore('RouteStore').getMeta();
  document.title = meta.suffixedTitle;
});
