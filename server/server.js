// Server entry point
//

// Babel takes care of jsx parsing & requiring.
require('babel/register');

var express = require('express'),
    User = require('./models/user'),
    app = express(),
    constants = require('../common/config/constants'),

    React = require('react'),
    App = require('../common/views/App.jsx'),
    ServerIndex = require('./views/index.jsx'),
    gofluxApp = require('../common/gofluxApp');

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

//
// Common middlewares
//
app.use(express.static('client'));
app.use(require('cookie-parser')(process.env.COOKIE_SECRET || 'cookie secret'));

// Parses post requests in application/json
app.use(require('body-parser').json());

//
// Authentication middleware. Populates req.user and sets cookie.
//
app.use(function(req, res, next) {
  var userId = req.signedCookies.userId;

  req.user = (userId && User.find(userId)) || User.create();
  res.cookie('userId', req.user.id, {
    httpOnly: true, signed: true, expires: new Date('2099/12/31')
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

  // Invoke route action
  var context = gofluxApp.createContext();
  context.getActions('routeActions').goTo(req.path).then(function(meta) {
    // Create app element & the index wrapper element
    //
    var app = React.createElement(App, {gofluxContext: context}),
        dehydratedStr = JSON.stringify(context.dehydrate()),
        index = React.createElement(ServerIndex, {
          meta: meta,
          renderedApp: React.renderToString(app),
          dehydratedScript: 'var __dehydrated = ' + dehydratedStr + ';'
        });

    res.send('<!doctype html>' + React.renderToStaticMarkup(index));
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
