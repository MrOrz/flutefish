var React = require('react'),
    constants = require('../config/constants'),
    mixins = require('goflux').mixins,

    SiteHeader = require('./SiteHeader.jsx'),

    ProductsPage = require('./ProductsPage.jsx'),
    ProductPage = require('./ProductPage.jsx');

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
        props: {productId: route.params.id}
      };
    }
  },

  getInitialState: function() {
    return {
      page: this._getPage()
    }
  },

  render: function() {
    return (
      <div>
        <SiteHeader />

        <this.state.page.component {...this.state.page.props} />
      </div>
    );
  },
});
