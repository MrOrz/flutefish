var React = require('react'),
    constants = require('../config/constants'),
    mixins = require('goflux').mixins;

module.exports = React.createClass({
  mixins: [
    mixins.GofluxMixin(React),
    mixins.StoreWatchMixin(['CartStore'], constants.CHANGE, '_onCartChange')
  ],

  propTypes: {
    productId: React.PropTypes.string.isRequired
  },

  _onCartChange: function() {
    this.setState(this.getInitialState());
  },

  _addToCart: function() {
    this.gofluxActions('cartActions').add(this.props.productId);
  },

  _removeFromCart: function() {
    this.gofluxActions('cartActions').remove(this.props.productId);
  },

  getInitialState: function() {
    var idsInCart = this.gofluxStore('CartStore').allIds();
    return {
      isInCart: idsInCart.indexOf(this.props.productId) !== -1
    };
  },

  render: function() {
    if (this.state.isInCart) {
      return (
        <button type="button"
                onClick={this._removeFromCart}>
          從購物車移除
        </button>
      );
    }else {
      return (
        <button type="button"
              onClick={this._addToCart}>
          加入購物車
        </button>
      );
    }
  }
});
