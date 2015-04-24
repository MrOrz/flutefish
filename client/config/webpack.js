var ExtractTextPlugin = require('extract-text-webpack-plugin'),
    constants = require('../../common/config/constants');

module.exports = {
  entry: ['./client/js/client.js'],
  output: {
    // __dirname is the path of webpack.js
    path: __dirname + '/../build',
    filename: 'client.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/, loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'css-loader?sourceMap!postcss-loader'
        )
      },
      {
        test: /\.(?:svg|png)$/,
        loader: 'url-loader?limit=1000' // Use DataURL for files under 1kb
      }
    ]
  },
  plugins: [new ExtractTextPlugin('client.css')],
  postcss: [require('autoprefixer-core'), require('csswring')({map: true})],
  debug: !constants.IS_PRODUCTION,
  devtool: constants.IS_PRODUCTION ? undefined : 'source-map'
}
