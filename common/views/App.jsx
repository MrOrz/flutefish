var React = require('react'),
    constants = require('../config/constants'),
    mixins = require('goflux').mixins,

    ProductsPage = require('./ProductsPage.jsx'),
    ProductPage = require('./ProductPage.jsx');

module.exports = React.createClass({
  mixins: [
    mixins.GofluxMixin(React),
    mixins.StoreWatchMixin([
      'RouteStore', 'ProductStore'
    ], constants.CHANGE, '_onStoreChange')
  ],

  _onStoreChange: function() {
    // TODO: remove this
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
      ProductStore: this.gofluxStore('ProductStore').all()
    }
  },

  render: function() {
    return (
      <div>
        <h1>Flutfish</h1>

        <this.state.page.component {...this.state.page.props} />

        <hr />
        <p>Debug 區</p>
        <hr />

        <h2>RouteStore</h2>
        <pre>
          {JSON.stringify(this.state.RouteStore, null, '  ')}
        </pre>

        <h2>ProductStore</h2>
        <pre>
          {JSON.stringify(this.state.ProductStore, null, '  ')}
        </pre>
      </div>
    );
  },
});
