var React = require('react'),
    constants = require('../config/constants'),
    mixins = require('goflux').mixins,
    resolver = require('../utils/resolver'),

    Link = require('./Link.jsx'),
    CartButton = require('./CartButton.jsx');

module.exports = React.createClass({
  mixins: [mixins.GofluxMixin(React)],

  propTypes: {
    productId: React.PropTypes.string.isRequired
  },

  componentDidMount: function() {
    this.gofluxStore('ProductStore')
        .addListener(constants.CHANGE, this._onStoreChange);
  },

  componentWillUnmount: function() {
    this.gofluxStore('ProductStore')
        .removeListener(constants.CHANGE, this._onStoreChange);
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
    var product = this.gofluxStore('ProductStore').get(this.props.productId),
        dataPromise = Promise.resolve();

    if (!(product && product.image)) {
      // store not populated yet, start loading

      dataPromise = resolver.addPromise(
        this.gofluxActions('productActions').get(this.props.productId)
      );
    }

    dataPromise.then(function() {
      // Re-fetch from store
      var product = this.gofluxStore('ProductStore').get(this.props.productId);

      this.gofluxActions('routeActions').setMeta({
        title: product.name,
        ogImage: product.image
      });
    }.bind(this));

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
