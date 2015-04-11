var express = require('express'),
    app = express();

app.use(express.static('client'));

// Catch-all route
//
app.get('*', function(req, res) {
  res.send('Hello World!');
});

var server = app.listen(5000, function() {
  console.log('Server listening at http://%s:%s',
              server.address().address, server.address().port);
});
