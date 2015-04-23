var React = require('react'),
    constants = require('../config/constants'),
    mixins = require('goflux').mixins,

    CartDropdown = require('./CartDropdown.jsx'),
    Link = require('./Link.jsx'),

    ProductsPage = require('./ProductsPage.jsx'),
    ProductPage = require('./ProductPage.jsx');

module.exports = React.createClass({
  mixins: [mixins.GofluxMixin(React)],

  componentDidMount: function() {
    this.gofluxStore('RouteStore')
        .addListener(constants.CHANGE, this._onStoreChange);
  },

  componentWillUnmount: function() {
    this.gofluxStore('RouteStore')
        .removeListener(constants.CHANGE, this._onStoreChange);
  },

  _onStoreChange: function() {
    this.setState(this.getInitialState());
  },

  _getPage: function() {
    var route = this.gofluxStore('RouteStore').getRoute();
    switch (route.name){
    case 'products':
      return {
        component: ProductsPage
      };
    case 'product':
      return {
        component: ProductPage,
        props: {productId: route.params.id},
        isHeaderTransparent: true
      };
    }
  },

  getInitialState: function() {
    return {
      page: this._getPage()
    }
  },

  render: function() {
    var headerClassName = 'SiteHeader';
    if (this.state.page.isHeaderTransparent) {
      headerClassName += ' is-transparent';
    }

    return (
      <div>
        <header className={headerClassName}>
          <div className="container SiteHeader-container">
            <Link to="products" className="SiteHeader-logo">
              <h1>Flutefish</h1>
            </Link>
            <CartDropdown />
          </div>
        </header>

        <this.state.page.component {...this.state.page.props} />
      </div>
    );
  },
});
