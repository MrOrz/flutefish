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
      'RouteStore', 'ProductStore', 'CartStore'
    ], constants.CHANGE, '_onStoreChange')
  ],

  _onStoreChange: function() {
    // TODO: remove this, just setPage should be enough
    //
    this.setState(this.getInitialState());
  },

  _getPage: function() {
    var route = this.gofluxStore('RouteStore').get();
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
      page: this._getPage(),
      RouteStore: this.gofluxStore('RouteStore').get(),
      ProductStore: this.gofluxStore('ProductStore').all(),
      CartStore: this.gofluxStore('CartStore').all()
    }
  },

  render: function() {
    return (
      <div>
        <SiteHeader />

        <this.state.page.component {...this.state.page.props} />

        <hr />
        <p>Debug 區</p>

        <h2>RouteStore</h2>
        <pre>
          {JSON.stringify(this.state.RouteStore, null, '  ')}
        </pre>

        <h2>ProductStore</h2>
        <pre>
          {JSON.stringify(this.state.ProductStore, null, '  ')}
        </pre>

        <h2>CartStore</h2>
        <pre>
          {JSON.stringify(this.state.CartStore, null, '  ')}
        </pre>
      </div>
    );
  },
});
