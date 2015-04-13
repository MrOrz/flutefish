var constants = require('../../common/config/constants');

module.exports = {
  entry: {
    'client': './client/js/client.jsx',
  },
  output: {
    // __dirname is the path of webpack.js
    path: __dirname + '/../build',
    filename: 'client.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/, loader: 'babel-loader'
      }
    ]
  },
  debug: !constants.IS_PRODUCTION
}

if (!constants.IS_PRODUCTION) {
  module.exports.devtool = 'eval-source-map';
}
