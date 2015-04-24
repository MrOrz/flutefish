var React = require('react'),
    constants = require('../config/constants'),

    ProductStore = require('../stores/ProductStore'),
    productActions = require('../actions/productActions'),

    CartButton = require('./CartButton.jsx');

module.exports = React.createClass({

  propTypes: {
    productId: React.PropTypes.string.isRequired
  },

  componentDidMount: function() {
    ProductStore.addListener(constants.CHANGE, this._onStoreChange);
  },

  componentWillUnmount: function() {
    ProductStore.removeListener(constants.CHANGE, this._onStoreChange);
  },

  _onStoreChange: function() {
    this.setState(this.getInitialState());
  },

  getInitialState: function() {
    return {
      product: ProductStore.get(this.props.productId)
    }
  },

  componentWillMount: function() {
    var product = ProductStore.get(this.props.productId);

    if (!(product && product.image)) {
      // store not populated yet, start loading

      productActions.get(this.props.productId);
    }

  },

  render: function() {
    var product = this.state.product ||
                  {id: this.props.productId}, // for <CartButton>
        image;

    if (product.image) {
      image = (
        <div className="ProductPage-image"
             style={{backgroundImage: 'url(' + product.image + ')'}}>
        </div>
      );
    } else {
      image = (
        <div className="ProductPage-image">
          <span className="glyphicon glyphicon-hourglass"></span>
        </div>
      )
    }

    return (
      <div className="ProductPage">
        {image}
        <div className="ProductPage-text">
          <h2>{product.name}</h2>
          <p>TWD {product.price}</p>
          <p><CartButton className="btn-lg" productId={product.id} /></p>
        </div>
      </div>
    );
  }
});
