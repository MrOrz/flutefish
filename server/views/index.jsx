var React = require('react');

module.exports = React.createClass({
  propTypes: {
    meta: React.PropTypes.object.isRequired,
    dehydratedScript: React.PropTypes.string,
    renderedApp: React.PropTypes.string
  },

  render: function() {
    var metaTags = [];

    if (this.props.ogImage) {
      metaTags.push(
        <meta property="og:image" content={this.props.ogImage} />
      )
    }

    return (
      <html lang="zh-TW">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{this.props.meta.title}</title>
        <link href="/vendor/bootstrap.min.css" rel="stylesheet" />
        <link href="/css/client.css" rel="stylesheet" />
        {metaTags}
      </head>
      <body>
        <div id="react-root" dangerouslySetInnerHTML={
          {__html: this.props.renderedApp}
        }></div>
        <script dangerouslySetInnerHTML={
          {__html: this.props.dehydratedScript}
        }></script>
        <script src="/build/client.js"></script>
      </body>
      </html>
    );
  }
});
