var React = require('react'),
    mixins = require('goflux').mixins,
    CartDropdown = require('./CartDropdown.jsx'),
    Link = require('./Link.jsx'),
    constants = require('../config/constants'),

    TRANSPARENT_HEADER_ROUTES = ['product']

module.exports = React.createClass({
  mixins: [
    mixins.GofluxMixin(React),
    mixins.StoreWatchMixin([
      'RouteStore'
    ], constants.CHANGE, '_onStoreChange')
  ],

  _onStoreChange: function() {
    this.setState(this.getInitialState());
  },

  getInitialState: function() {
    var routeName = this.gofluxStore('RouteStore').getRoute().name
    return {
      isTransparent: TRANSPARENT_HEADER_ROUTES.indexOf(routeName) !== -1
    }
  },

  render: function() {
    var className = 'SiteHeader';
    if(this.state.isTransparent) {
      className += ' is-transparent'
    }

    return (
      <header className={className}>
        <div className="container SiteHeader-container">
          <Link to="products" className="SiteHeader-logo">
            <h1>Flutefish</h1>
          </Link>
          <CartDropdown />
        </div>
      </header>
    );
  }
});
