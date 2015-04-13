var React = require('react'),
    App = require('../../common/views/App.jsx'),
    gofluxApp = require('../../common/gofluxApp'),
    context = gofluxApp.createContext();

context.rehydrate(window.__dehydrated);

React.render((
  <App gofluxContext={context} />
), document.getElementById('react-root'));
