var React = require('react'),
    GofluxMixin = require('goflux').mixins.GofluxMixin,
    router;

module.exports = React.createClass({
  propTypes: {
    to: React.PropTypes.string.isRequired,  // State name
    params: React.PropTypes.object          // State parameter
  },

  mixins: [GofluxMixin(React)],

  getInitialState: function() {
    return {
      href: router.makePath(this.props.to, this.props.params)
    };
  },

  render: function() {
    return (
      <a href={this.state.href} onClick={this._onClick} {...this.props}>
        {this.props.children}
      </a>
    );
  },

  _onClick: function(evt) {
    evt.preventDefault();
    this.gofluxActions('routeActions').goTo(this.state.href);
  }
});

// Populate router after module.exports to break the following require loop:
// common/config/router -> common/views/* -> common/views/Link -> common/config/router
//
router = require('../config/router');
