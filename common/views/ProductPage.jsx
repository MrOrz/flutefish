var React = require('react'),

    ProductStore = require('../stores/ProductStore'),

    CartButton = require('./CartButton.jsx');

module.exports = React.createClass({

  propTypes: {
    productId: React.PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {
      product: ProductStore.get(this.props.productId)
    }
  },

  render: function() {
    var product = this.state.product;

    return (
      <div className="ProductPage">
        <div className="ProductPage-image"
             style={{backgroundImage: 'url(' + product.image + ')'}}>
        </div>
        <div className="ProductPage-text">
          <h2>{product.name}</h2>
          <p>TWD {product.price}</p>
          <p><CartButton className="btn-lg" productId={product.id} /></p>
        </div>
      </div>
    );
  }
});
