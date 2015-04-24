var React = require('react'),

    CartButton = require('./CartButton.jsx');

module.exports = React.createClass({

  propTypes: {
    productId: React.PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {

      // Hard code product for now.
      // It should fetch data using this.props.productId.
      //
      product: {
        id: 'mola', name: 'Mola', price: 890,
        thumbnail: '/images/mola-bags.jpg',
        image: '/images/mola-bag.jpg'
      }
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
