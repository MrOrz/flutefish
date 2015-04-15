var React = require('react'),
    constants = require('../config/constants'),
    mixins = require('goflux').mixins,

    Link = require('./Link.jsx'),
    CartButton = require('./CartButton.jsx');

module.exports = React.createClass({
  mixins: [mixins.GofluxMixin(React)],

  propTypes: {
    productId: React.PropTypes.string.isRequired
  },

  render: function() {
    var product = this.gofluxStore('ProductStore').get(this.props.productId);

    return (
      <div>
        <Link to="products">&lt; Back</Link>
        <h2>品名：{product.name}</h2>
        <p>價格：{product.price}</p>
        <p><CartButton productId={product.id} /></p>
      </div>
    );
  }
});
