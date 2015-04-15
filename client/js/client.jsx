// Require jQuery and bootstrap
//
require('expose?jQuery!expose?$!jquery'); // expose "jQuery" and "$" to window
require('bootstrap');

var React = require('react'),
    App = require('../../common/views/App.jsx'),
    gofluxApp = require('../../common/gofluxApp'),
    context = gofluxApp.createContext();

context.rehydrate(window.__dehydrated);

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
