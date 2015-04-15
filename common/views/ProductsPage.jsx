var React = require('react'),
    constants = require('../config/constants'),
    mixins = require('goflux').mixins,

    Link = require('./Link.jsx'),

    CartButton = require('./CartButton.jsx');

module.exports = React.createClass({
  mixins: [
    mixins.GofluxMixin(React)
  ],

  getInitialState: function(){
    return {
      idsInCart: this.gofluxStore('CartStore').allIds()
    };
  },

  render: function() {

    var products = this.gofluxStore('ProductStore').all()
                       .map(function(product, idx) {
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
          {products}
        </ul>
      </div>
    );
  }
});
