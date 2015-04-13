var React = require('react');

module.exports = React.createClass({
  propTypes: {
    dehydratedScript: React.PropTypes.string,
    renderedApp: React.PropTypes.string
  },

  render: function(){
    return (
      <html lang="zh-TW">
      <head>
        <meta charSet="UTF-8" />
        <title>Flutefish</title>
      </head>
      <body>
        <div id="react-root" dangerouslySetInnerHTML={{__html: this.props.renderedApp}}></div>
        <script dangerouslySetInnerHTML={{__html: this.props.dehydratedScript}}></script>
        <script src="/build/client.js"></script>
      </body>
      </html>
    );
  }
});
