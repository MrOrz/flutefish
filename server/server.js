// Server entry point
//

// Babel takes care of jsx parsing & requiring.
require('babel/register');

var express = require('express'),
    app = express(),

    React = require('react'),
    User = require('./models/user'),
    App = require('../common/views/App.jsx'),

    constants = require('../common/config/constants'),
    gofluxApp = require('../common/gofluxApp'),
    resolver = require('../common/utils/resolver'),
    fetch = require('../common/utils/fetch');

// Catch all unhandled promise rejections and print error.
// Ref: https://iojs.org/api/process.html#process_event_unhandledrejection
//
process.on('unhandledRejection', function(reason, promise) {
  if (reason.stack) {
    // Error object, has stack info
    console.error('[Unhandled Rejection]', reason.stack);
  } else {
    console.error('[Unhandled Rejection] Reason:', reason);
  }
  console.error('[Unhandled Rejection] Promise:', promise);
});

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//
// Common middlewares
//
app.use(require('serve-favicon')(__dirname + '/../client/favicon.png'));
app.use(require('morgan')('dev'));
app.use(express.static('client'));
app.use(require('cookie-parser')(process.env.COOKIE_SECRET || 'cookie secret'));
app.use(require('body-parser').json()); // Post requests in application/json

//
// Authentication middleware. Populates req.user and sets cookie.
//
app.use(function(req, res, next) {
  var userId = req.signedCookies.userId;
  console.log('[Auth]', userId);

  req.user = (userId && User.find(userId)) || User.create();
  res.cookie('userId', req.user.id, {
    httpOnly: true, signed: true, expires: new Date('2099/12/31'), path: '/'
  });

  next();
});

//
// API endpoints
//
app.use('/api', require('./routes/api.js'));

//
// Catch-all route
//
app.get('*', function(req, res) {
  var context = gofluxApp.createContext(),
      cookieStr = res.get('set-cookie'), // Fetch the newly-set cookie
      app;

  // First, populate route store
  //
  context.getActions('routeActions').goTo(req.path);

  // 1st render, triggers all componentWillMount.
  app = React.createElement(App, {gofluxContext: context});

  console.log('[server] 1st render');

  // clear promise --> render --> get a promise that resolves after all promises
  //
  // 3 synchronous method calls in a row to prevent intervention from other
  // requests.
  //
  resolver.clearPromises();
  fetch.setCookie(cookieStr);
  React.renderToString(app);
  resolver.resolveAll().then(function() {
    // All promises added to resolver has been resolved.
    // Therefore all stores should be populated.
    //

    console.log('[server] 2nd render');
    var dehydratedStr = JSON.stringify(context.dehydrate()),
        html = React.renderToString(app); // Also collects promises, but ignored

    res.render('index', {
      meta: context.getStore('RouteStore').getMeta(),
      html: html, dehydratedStr: dehydratedStr
    });
  }).catch(function(reason) {
    if (reason === 'Not found') {
      res.sendStatus(404);
    } else {
      throw reason;
    }
  });

});

var server = app.listen(constants.PORT, function() {
  console.log('Server listening at http://%s:%s',
              server.address().address, server.address().port);
});
