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

  _getPageElem: function(){
    var route = this.gofluxStore('RouteStore').get();
    switch(route.name){
    case 'products':
      return <ProductsPage />
    case 'product':
      return <ProductPage productId={route.params.id} />
    }
  },

  getInitialState: function() {
    return {
      pageElem: this._getPageElem(),
      RouteStore: this.gofluxStore('RouteStore').get(),
      ProductStore: this.gofluxStore('ProductStore').all()
    }
  },

  render: function() {
    return (
      <div>
        <h1>Flutfish</h1>

        {this.state.pageElem}

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
