var React = require('react'),
    constants = require('../config/constants'),
    mixins = require('goflux').mixins,

    Link = require('./Link.jsx'),

    CartButton = require('./CartButton.jsx');

module.exports = React.createClass({
  mixins: [
    mixins.GofluxMixin(React),
    mixins.StoreWatchMixin([
      'ProductStore', 'CartStore'
    ], constants.CHANGE, '_onStoreChange')
  ],

  _onStoreChange: function() {
    this.setState( this.getInitialState() );
  },

  getInitialState: function() {
    return {
      products: this.gofluxStore('ProductStore').all(),
      idsInCart: this.gofluxStore('CartStore').allIds()
    };
  },

  render: function() {

    var productElems = this.state.products.map(function(product, idx) {
      return (
        <li key={product.id}>
          <Link to="product" params={{id: product.id}}>{product.name}</Link>
          <CartButton productId={product.id} />
        </li>
      );
    }.bind(this));

    return (
      <div>
        <h2>Products</h2>
        <ul>
          {productElems}
        </ul>
      </div>
    );
  }
});
