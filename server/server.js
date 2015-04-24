// Server entry point
//

// Babel takes care of jsx parsing & requiring.
require('babel/register');

var express = require('express'),
    app = express(),

    User = require('./models/user'),

    constants = require('../common/config/constants');

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
  res.render('index');
});

var server = app.listen(constants.PORT, function() {
  console.log('Server listening at http://%s:%s',
              server.address().address, server.address().port);
});
