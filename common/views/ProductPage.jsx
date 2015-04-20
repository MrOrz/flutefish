var React = require('react'),
    constants = require('../config/constants'),
    mixins = require('goflux').mixins,
    resolver = require('../utils/resolver'),

    Link = require('./Link.jsx'),
    CartButton = require('./CartButton.jsx');

module.exports = React.createClass({
  mixins: [
    mixins.GofluxMixin(React),
    mixins.StoreWatchMixin([
      'ProductStore'
    ], constants.CHANGE, '_onStoreChange')
  ],

  propTypes: {
    productId: React.PropTypes.string.isRequired
  },

  _onStoreChange: function() {
    this.setState(this.getInitialState());
  },

  getInitialState: function() {
    return {
      product: this.gofluxStore('ProductStore').get(this.props.productId)
    }
  },

  componentWillMount: function() {
    var product = this.gofluxStore('ProductStore').get(this.props.productId);

    if (product && product.price) {
      // Store populated with required data, just set title
      this.gofluxActions('routeActions').setMeta({
        title: product.name,
        ogImage: product.image
      });

    } else {
      // store not populated yet, start loading

      resolver.addPromise(
        this.gofluxActions('productActions').get(this.props.productId)
      );
    }
  },

  render: function() {
    var product = this.state.product || {};

    return (
      <div className="ProductPage">
        <div className="ProductPage-image"
             style={{backgroundImage: 'url('+product.image+')'}}>
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
