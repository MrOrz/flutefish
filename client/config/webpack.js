var constants = require('../../common/config/constants');

module.exports = {
  entry: ['./client/js/client.jsx'],
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
  debug: !constants.IS_PRODUCTION,
  devtool: constants.IS_PRODUCTION ? undefined : 'eval-source-map'
}
